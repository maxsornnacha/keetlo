"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TextField, IconButton, InputAdornment, Snackbar, Alert } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook, faApple } from "@fortawesome/free-brands-svg-icons";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AxiosError } from 'axios';

export default function SignIn(){
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleLogin = async (): Promise<void> => {
    try {
      if (!email || !password) {
        setError("Email and password are required.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Invalid email format.");
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/signin`,
        { email, password, rememberMe },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: "Login successful!",
          severity: "success",
        });
        setTimeout(()=>{
          // router.push("/");
          window.location.href = "/"
        },1500);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // Now you can safely access AxiosError properties
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Sign-Up Failed",
          severity: "error",
        });
        setError(error.response?.data?.message || "An error occurred. Please try again.");
      } else {
        // Handle the case where the error is not an AxiosError
        setSnackbar({
          open: true,
          message: "An unknown error occurred.",
          severity: "error",
        });
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleRegister = (): void => {
    router.push("/sign-up");
  };

  // Handle Google Sign-In
  const handleGoogleLogin = (): void => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  // Handle Facebook Sign-In
  const handleFacebookLogin = (): void => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/facebook`;
  };

  // Handle Apple Sign-In
  const handleAppleLogin = (): void => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/apple`;
  };

  return (
    <>
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Section */}
      <div className="hidden lg:flex flex-1 justify-center items-center">
        <Image
          src="/images/sign-in/signin-image.png"
          alt="Illustration"
          width={500}
          height={500}
        />
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col justify-center bg-white p-10">
        <div className="max-w-sm mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>

          <div className="space-y-4">
            {/* Email */}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              error={!!error}
              helperText={error && error.includes("email") ? error : ""}
            />

            {/* Password */}
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff className="w-5 h-5" /> : <Visibility className="w-5 h-5" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-700">
                Remember Me
              </label>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-red-500 text-white text-lg font-semibold py-3 rounded hover:bg-red-700 transition"
            >
              Sign In
            </button>
          </div>

          {/* Register Link */}
          <p className="text-sm text-center text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <button
              onClick={handleRegister}
              className="text-red-500 hover:underline font-medium"
            >
              Register here
            </button>
          </p>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="space-y-4">
            {/* Google */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center border border-gray-300 text-gray-700 bg-white py-3 rounded hover:bg-gray-100 transition"
            >
              <FontAwesomeIcon icon={faGoogle} className="mr-2" />
              Sign in with Google
            </button>

            {/* Facebook */}
            <button
              onClick={handleFacebookLogin}
              className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
            >
              <FontAwesomeIcon icon={faFacebook} className="mr-2" />
              Sign in with Facebook
            </button>

            {/* Apple */}
            <button
              onClick={handleAppleLogin}
              className="w-full flex items-center justify-center bg-black text-white py-3 rounded hover:bg-gray-800 transition"
            >
              <FontAwesomeIcon icon={faApple} className="mr-2" />
              Sign in with Apple
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Snackbar for notifications */}
    <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Top-center position
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity as "success" | "error"}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
    </Snackbar>
    </>
  );
};

