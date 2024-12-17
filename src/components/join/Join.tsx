"use client";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { Snackbar, Alert, AlertColor } from "@mui/material";
import NewMeeting from "./NewMeeting";

interface Slide {
  title: string;
  description: string;
  buttonText: string;
  image: string;
}


const slides: Slide[] = [
  {
    title: "Try Premium Google Meet features",
    description: "Enjoy longer group calls and more with a 1-month trial of a Google One Premium plan.",
    buttonText: "Start trial",
    image: "https://via.placeholder.com/64",
  },
  {
    title: "Seamless HD Calls",
    description: "Experience crystal-clear video calls and enhanced collaboration with HD quality.",
    buttonText: "Learn More",
    image: "https://via.placeholder.com/64",
  },
  {
    title: "Secure Meetings",
    description: "Keep your meetings private and secure with enterprise-grade security features.",
    buttonText: "Get Started",
    image: "https://via.placeholder.com/64",
  },
];

export default function Join() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("info");

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleJoinClick = async () => {
    if (!inputValue.trim()) {
      setSnackbarMessage("Please enter a valid meeting code or link.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/meetings/pre-join`, {
        room_code: inputValue.trim(),
      });

      if (response.status === 200) {
        const { meeting_info } = response.data;
        setSnackbarMessage(`Room found: ${meeting_info.room_name}`);
        setSnackbarSeverity("success");
        setSnackbarOpen(true);

        setTimeout(() => {
          console.log(`Redirecting to room: ${meeting_info.room_code}`);
          // Use your router logic here
          window.location.href = `/room/${meeting_info.room_code}`;
        }, 2000);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          setSnackbarMessage("Room not found or inactive.");
        } else {
          setSnackbarMessage("An error occurred. Please try again.");
        }
      } else {
        setSnackbarMessage("An unexpected error occurred.");
      }
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="p-44">
      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left Section */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4">
              Video calls and meetings for everyone
            </h1>
            <p className="text-gray-600 mb-6">
              Connect, collaborate, and celebrate from anywhere with Google Meet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <NewMeeting />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter a code or link"
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                  onClick={handleJoinClick}
                  className="text-red-500 bg-gray-100 py-2 px-6 rounded-md hover:bg-gray-200"
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 text-center relative">
            <div className="relative">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-0 w-full transition-opacity duration-700 ${
                    currentIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="bg-gray-200 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                    <Image
                      src={slide.image}
                      alt={`Promo Icon ${index + 1}`}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  </div>
                  <h2 className="text-xl font-semibold mt-4">{slide.title}</h2>
                  <p className="text-gray-600 mt-2">{slide.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
