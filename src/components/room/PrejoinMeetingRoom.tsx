"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Typography,
  Tooltip,
  Avatar,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import { fetchUserLoginStatus } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import axios from "axios";
import { io } from "socket.io-client";
import { AxiosError } from 'axios';

const socket = io(process.env.NEXT_PUBLIC_API_SOCKET_URL);

type DeviceSettings = {
  isMicOn: boolean;
  isCameraOn: boolean;
  selectedMic: string;  // or the correct type if it's more specific (like an object or number)
  selectedSpeaker: string;
  selectedCamera: string;
  status: boolean;
};

interface Props {
  room_code: string;
  handleSetAllDevicesBeforeConnecting: (data: { data: DeviceSettings }) => Promise<void>;
}

export default function PrejoinMeetingRoom({ room_code, handleSetAllDevicesBeforeConnecting }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loggedIn, user, loading } = useSelector((state: RootState) => state.auth);
  const [error, setError] = useState<string | null>(null);

  const [selectedMic, setSelectedMic] = useState<string>("");
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>("");
  const [selectedCamera, setSelectedCamera] = useState<string>("");

  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
  const [speakers, setSpeakers] = useState<MediaDeviceInfo[]>([]);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);

  const [isMicOn, setIsMicOn] = useState<boolean>(true);
  const [isCameraOn, setIsCameraOn] = useState<boolean>(true);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info" as "info" | "success" | "error" | "warning",
  });

  useEffect(() => {
    dispatch(fetchUserLoginStatus());
    fetchDevices();
  }, [dispatch]);

  const requestPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      console.log("Permissions granted");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Permission denied:", error);
    
        if (error.name === "NotReadableError") {
          setError("The camera is in use by another application. Please close the other application and try again.");
        } else if (error.name === "NotAllowedError") {
          setError("Camera access was denied. Please enable camera permissions in your browser settings.");
        } else if (error.name === "OverconstrainedError") {
          setError("The camera is not available or doesn't meet the required constraints.");
        } else {
          setError("An unexpected error occurred while accessing the camera. Please try again.");
        }
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    }
    
  };

  const isCameraAvailable = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.some((device) => device.kind === "videoinput");
  };
  
  const openCamera = async () => {
    // try {
      const cameraAvailable = await isCameraAvailable();
      if (!cameraAvailable) {
        setError("No camera devices found. Please connect a camera and try again.");
        return;
      }
  
      // Request access to the user's camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
  
        // Wait for the video element to be ready before calling play()
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch((err) => {
            console.log("Error playing video:", err);
          });
        };
      }
    // } 
    // catch (err: any) {
    //         // Suppress the global error notification
    //         window.__REACT_ERROR__ = null; // Clear any global error handlers
    //    // Graceful handling of specific errors
    //   if (err.name === "NotReadableError") {
    //     setError("The camera is in use by another application. Please close the other application and try again.");
    //   } else if (err.name === "NotAllowedError") {
    //     setError("Camera access was denied. Please enable camera permissions in your browser settings.");
    //   } else if (err.name === "OverconstrainedError") {
    //     setError("The camera is not available or doesn't meet the required constraints.");
    //   } else {
    //     setError("An unexpected error occurred while accessing the camera. Please try again.");
    //   }

    //   console.log("Detailed error for debugging:", err);
    // }
  };

  const toggleMic = async () => {
    if (audioStreamRef.current) {
      audioStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !isMicOn;
      });
      setIsMicOn(!isMicOn);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioStreamRef.current = stream;
        setIsMicOn(true);
      } catch (error) {
        console.log("Failed to toggle microphone:", error);
        setSnackbar({
          open: true,
          message: "Failed to toggle microphone.",
          severity: "error",
        });
      }
    }
  };

  const toggleCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !isCameraOn;
      });
      setIsCameraOn(!isCameraOn);
    }
  };

  const fetchDevices = async () => {
    try {
      await requestPermissions();
      await openCamera();
      const devices = await navigator.mediaDevices.enumerateDevices();

      const micDevices = devices.filter((device) => device.kind === "audioinput");
      const speakerDevices = devices.filter((device) => device.kind === "audiooutput");
      const cameraDevices = devices.filter((device) => device.kind === "videoinput");

      setMicrophones(micDevices);
      setSpeakers(speakerDevices);
      setCameras(cameraDevices);

      if (micDevices.length) setSelectedMic(micDevices[0].deviceId);
      if (speakerDevices.length) setSelectedSpeaker(speakerDevices[0].deviceId);
      if (cameraDevices.length) setSelectedCamera(cameraDevices[0].deviceId);
    } catch (error) {
      console.log(error);
      setSnackbar({
        open: true,
        message: "Failed to fetch devices. Please check your permissions.",
        severity: "error",
      });
    }
  };

  const handleDeviceChange = async () => {
    if (selectedMic) {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: selectedMic } },
      });
      audioStreamRef.current = stream;
    }

    if (selectedCamera) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: selectedCamera } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }
  };

  useEffect(() => {
    handleDeviceChange();
  }, [selectedMic, selectedCamera]);

  const handleJoinToTheRoom = async () => {
    if (!selectedMic || !selectedCamera) {
      setSnackbar({
        open: true,
        message: "Please select your devices",
        severity: "error",
      });
    } else {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/meetings/join`,
          { room_code },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setSnackbar({
            open: true,
            message: "Successfully joined the room!",
            severity: "success",
          });
          await handleSetAllDevicesBeforeConnecting({data : {
            isMicOn : isMicOn,
            isCameraOn: isCameraOn,
            selectedMic: selectedMic,
            selectedSpeaker: selectedSpeaker,
            selectedCamera: selectedCamera,
            status: true
          }})
          socket.emit("update-meeting-room", { room_code });
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const errorMessage = error.response?.data?.message || "Failed to join the room.";
          setSnackbar({
            open: true,
            message: errorMessage,
            severity: "error",
          });
        } else if (error instanceof Error) {
          // Handle non-Axios errors here
          setSnackbar({
            open: true,
            message: error.message || "An unexpected error occurred.",
            severity: "error",
          });
        } else {
          // Handle case where the error is not an instance of Error or AxiosError
          setSnackbar({
            open: true,
            message: "An unknown error occurred.",
            severity: "error",
          });
        }
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <div className="h-screen bg-gray-800 flex justify-center items-center">
        <CircularProgress sx={{ color: "white" }} />
      </div>
    );
  }

  if (!loading && !loggedIn) {
    return <div>Please login before coming here</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100 text-black">
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Left Panel */}
      <div className="flex flex-col lg:w-2/3 bg-gray-800 text-white  p-4 lg:p-8 justify-between">
        <div>
          <Typography variant="h6" className="mb-2">
            {user?.name}
          </Typography>
          <div className="relative w-full aspect-video bg-black flex items-center justify-center rounded-lg">
            {error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <video
                ref={videoRef}
                className="w-full h-full  lg:border lg:border-gray-300 rounded-md"
                autoPlay
                playsInline
              />
            )}
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <Tooltip title="Toggle microphone">
            <button
              onClick={toggleMic}
              className={`${
                isMicOn ? "p-4 rounded-full bg-red-600 hover:bg-red-700" : "p-4 rounded-full bg-red-600 hover:bg-red-700"
              }`}
            >
              {isMicOn ? <MicIcon className="text-white h-7 w-7" /> : <MicOffIcon className="text-white h-7 w-7" />}
            </button>
          </Tooltip>
          <Tooltip title="Toggle camera">
            <button
              onClick={toggleCamera}
              className={`${
                isCameraOn ? "p-4 rounded-full bg-red-600 hover:bg-red-700" : "p-4 rounded-full bg-red-600 hover:bg-red-700"
              }`}
            >
              {isCameraOn ? <VideocamIcon className="text-white h-7 w-7" /> : <VideocamOffIcon className="text-white h-7 w-7" />}
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col lg:w-1/3 bg-white p-8">
        <Typography variant="h5" className="mb-4">
          Ready to join?
        </Typography>
        <div className="flex items-center my-4">
          {user?.image ? (
            <Avatar
              className="bg-gray-500 me-2"
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${user.image}?t=${new Date().getTime()}`}
            ></Avatar>
          ) : (
            <Avatar className="bg-gray-500 me-2">{user?.name?.slice(0, 1)}</Avatar>
          )}
          <Typography>{user?.name} is in this call</Typography>
        </div>
        <button
          className="mt-4 bg-red-500 hover:bg-red-700 text-white p-2 rounded-md"
          onClick={handleJoinToTheRoom}
        >
          Join here
        </button>
        <button
          className="mt-4 bg-gray-900 hover:bg-gray-700 text-white p-2 rounded-md"
          onClick={() => router.push("/join")}
        >
          Back
        </button>

        {/* Bottom Device Selectors */}
        <div className="mt-auto space-y-4 pt-8">
          <FormControl fullWidth className="mb-4">
            <InputLabel>Microphone</InputLabel>
            <Select value={selectedMic} onChange={(e) => setSelectedMic(e.target.value)} label="Microphone">
              {microphones.map((mic) => (
                <MenuItem key={mic.deviceId} value={mic.deviceId}>
                  {mic.label || "Unknown Microphone"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth className="mb-4">
            <InputLabel>Speakers</InputLabel>
            <Select value={selectedSpeaker} onChange={(e) => setSelectedSpeaker(e.target.value)} label="Speakers">
              {speakers.map((speaker) => (
                <MenuItem key={speaker.deviceId} value={speaker.deviceId}>
                  {speaker.label || "Unknown Speaker"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Camera</InputLabel>
            <Select value={selectedCamera} onChange={(e) => setSelectedCamera(e.target.value)} label="Camera">
              {cameras.map((camera) => (
                <MenuItem key={camera.deviceId} value={camera.deviceId}>
                  {camera.label || "Unknown Camera"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
