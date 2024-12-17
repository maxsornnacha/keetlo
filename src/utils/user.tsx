"use client";

import axios, { AxiosError } from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export const fetchLoginStatus = async (): Promise<{ loggedIn: boolean; user?: User }> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/status`, {
      withCredentials: true, // Send cookies with the request
    });

    if (response.status === 200 && response.data) {
      const { id, name, email, image } = response.data;
      return {
        loggedIn: true,
        user: { id, name, email, image },
      };
    }
    return { loggedIn: false };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Error fetching login status:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return { loggedIn: false };
  }
};
