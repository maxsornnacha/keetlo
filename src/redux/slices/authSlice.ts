import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../store";

// Async thunk for fetching login status
export const fetchUserLoginStatus = createAsyncThunk<
  { loggedIn: boolean; user: User | null },
  void,
  { state: RootState }
>("auth/fetchUserLoginStatus", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/status`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 && response.data) {
      return {
        loggedIn: true,
        user: {
          id: response.data.id,
          user_code: response.data.user_code,
          name: response.data.name,
          email: response.data.email,
          image: response.data.image,
          google_email: response.data.google_email,
          facebook_email: response.data.facebook_email,
          apple_email: response.data.apple_email,
          timezone: response.data.timezone,
        },
      };
    }

    return { loggedIn: false, user: null };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log("Axios error:", error.message);
    } else {
      console.log("Unexpected error:", error);
    }
    return thunkAPI.rejectWithValue({ loggedIn: false });
  }
});

// User interface
interface User {
  id: string;
  user_code: string;
  name: string;
  email: string;
  image?: string;
  google_email: string;
  facebook_email: string;
  apple_email: string;
  timezone: string;
}

// Auth state interface
interface AuthState {
  loggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  loggedIn: false,
  user: null,
  loading: true,
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}, // Add reducers here if needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLoginStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserLoginStatus.fulfilled,
        (state, action: PayloadAction<{ loggedIn: boolean; user: User | null }>) => {
          state.loggedIn = action.payload.loggedIn;
          state.user = action.payload.user;
          state.loading = false;
        }
      )
      .addCase(fetchUserLoginStatus.rejected, (state, action) => {
        state.loggedIn = false;
        state.user = null;
        state.loading = false;
        state.error = action.error?.message || "Error fetching login status";
      });
  },
});

export default authSlice.reducer;
