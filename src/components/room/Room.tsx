"use client";
import PrejoinMeetingRoom from "./PrejoinMeetingRoom";
import MeetingRoom from "./MeetingRoom";
import { useRef, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { io } from "socket.io-client";
import handlePeerConnection from "./handlePeerConnection";
import Peer from "simple-peer";
import { useRouter } from "next/navigation";

const socket = io(process.env.NEXT_PUBLIC_API_SOCKET_URL);

interface Props {
  room_code: string;
}

interface Devices {
  isMicOn: boolean;
  isCameraOn: boolean;
  selectedMic: string;
  selectedSpeaker: string;
  selectedCamera: string;
  status: boolean;
}

interface MeetingInfo {
  meeting_room_id: number;
  host_user_id: number;
  room_name: string;
  room_description: string;
  room_code: string;
  start_time: string;
  end_time: string | null;
  status: string;
}

interface Participant {
  meeting_participant_id: number;
  meeting_room_id: number;
  user_id: number;
  role: string;
  user_code: string;
  name: string;
  image: string;
  isSelf: boolean;
}

interface MeetingDetails {
  meeting_info: MeetingInfo;
  participants: Participant[];
}

export default function CheckStatusBeforeJoining({ room_code }: Props) {
  const router = useRouter();
  const [devices, setDevices] = useState<Devices>({
    isMicOn: false,
    isCameraOn: false,
    selectedMic: "",
    selectedSpeaker: "",
    selectedCamera: "",
    status: false,
  });
  
  const [meetingDetails, setMeetingDetails] = useState<MeetingDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [peers, setPeers] = useState<{ [key: string]: Peer.Instance }>({});

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});

  const handleSetAllDevicesBeforeConnecting = async ({data}: {data: Devices}) => {
    setDevices(data);
    await handlePeerConnection(data, localVideoRef, remoteVideoRefs, socket, peers, setPeers, room_code);
  };

  const fetchMeetingDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/meetings?room_code=${room_code}`,
        {
          withCredentials: true,
        }
      );
      setMeetingDetails(response.data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        // AxiosError specific handling
        if (err.response) {
          console.log("Error fetching meeting details:", err.response.data);
          setError(err.response.data?.message || "Failed to load meeting details.");
        } else if (err.request) {
          // No response was received
          console.log("Error fetching meeting details: No response received", err.request);
          setError("Failed to load meeting details due to no response from server.");
        } else {
          // Something happened while setting up the request
          console.log("Error fetching meeting details:", err.message);
          setError(err.message || "Failed to load meeting details.");
        }
      } else {
        // Handle generic error
        console.log("An unknown error occurred:", err);
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleUpdateMeetingDetails = ({ room_code: updatedRoomCode }: { room_code: string }) => {
      if (updatedRoomCode === room_code) {
        fetchMeetingDetails();
      }
    };

    socket.on("update-meeting-room", handleUpdateMeetingDetails);

    return () => {
      socket.off("update-meeting-room", handleUpdateMeetingDetails);
    };
  }, [room_code]);

  useEffect(() => {
    fetchMeetingDetails();
  }, [room_code]);

  const handleEndCall = async () => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/meetings/exit`, {
        data: { room_code },
        withCredentials: true,
      });

      if (response.status === 200) {
        socket.emit("update-meeting-room", { room_code });
        router.push("/join");
      }
    } catch (error) {
      console.log("Error ending the call:", error);
    }
  };

  const handleToggleCamera = (status: boolean) => {
    setDevices((prev) => ({ ...prev, isCameraOn: status }));
  
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getVideoTracks().forEach((track) => {
        track.enabled = status; // Enable or disable the video track
      });
    }
  };
  
  const handleToggleMic = (status: boolean) => {
    setDevices((prev) => ({ ...prev, isMicOn: status }));
  
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach((track) => {
        track.enabled = status; // Enable or disable the audio track
      });
    }
  };

  if (isLoading) {
    return <div className="text-white text-center mt-20">Loading meeting details...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-20">Error: {error}</div>;
  }

  if (!meetingDetails) {
    return <div className="text-white text-center mt-20">No meeting details found.</div>;
  }

  return (
    <>  
    <div className={`${devices.status && "hidden"}`}>
        <PrejoinMeetingRoom
          room_code={room_code}
          handleSetAllDevicesBeforeConnecting={handleSetAllDevicesBeforeConnecting}
        />
    </div>
    <div className={`${!devices.status && "hidden"}`}>
        <MeetingRoom
          localVideoRef={localVideoRef}
          remoteVideoRefs={remoteVideoRefs}
          devices={devices}
          meetingDetails={meetingDetails}
          handleEndCall={handleEndCall}
          handleToggleCamera={handleToggleCamera}
          handleToggleMic={handleToggleMic}
        />
    </div>
    </>
  );
}