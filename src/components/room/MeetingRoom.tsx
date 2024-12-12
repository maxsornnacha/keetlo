"use client";

import React, { useRef, useEffect, useState, RefObject } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Button,
  Tooltip,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from "@mui/icons-material/People";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CallEndIcon from "@mui/icons-material/CallEnd";
import ClosedCaptionIcon from "@mui/icons-material/ClosedCaption";
import FullscreenIcon from "@mui/icons-material/Fullscreen";


const participants = [
    { id: 1, name: 'You', avatar: 'https://cdn.pixabay.com/photo/2023/11/05/15/25/winter-8367632_1280.jpg', isSelf: true },
    { id: 2, name: 'John Doe', avatar: 'https://cdn.pixabay.com/photo/2024/11/02/17/29/city-9169729_1280.jpg' },
    { id: 3, name: 'Jane Smith', avatar: 'https://media.istockphoto.com/id/1455708318/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%A1%E0%B8%B8%E0%B8%A1%E0%B8%A1%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%AD%E0%B8%99%E0%B8%B8%E0%B8%A3%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B9%8C%E0%B8%98%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%E0%B8%9B%E0%B9%88%E0%B8%B2%E0%B8%8A%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%A5%E0%B8%99-sungei-buloh-%E0%B9%83%E0%B8%99%E0%B8%AA%E0%B8%B4%E0%B8%87%E0%B8%84%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%8C.jpg?s=2048x2048&w=is&k=20&c=CAwO-AmBh5kv3HAX88fUqB_Ce-QV0kEpy1ow_jypkSk=' },
    { id: 4, name: 'Bob Johnson', avatar: 'https://cdn.pixabay.com/photo/2022/09/07/12/22/autumn-7438675_960_720.jpg' },
];

interface Devices {
  isMicOn : Boolean;
  isCameraOn: Boolean;
  selectedMic: string;
  selectedSpeaker: string;
  selectedCamera: string;
  status: Boolean;
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

interface Props { 
  devices: Devices;
  meetingDetails: MeetingDetails;
  handleEndCall: () => void;
  localVideoRef: RefObject<HTMLVideoElement>;
  remoteVideoRefs: RefObject<{ [key: string]: HTMLVideoElement }>;
  handleToggleCamera: any;
  handleToggleMic: any;
}


export default function MeetingRoom({
  devices, meetingDetails, handleEndCall, localVideoRef, handleToggleCamera, handleToggleMic
}: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const { meeting_info, participants } = meetingDetails;
  
  console.log("localVideoRef :", localVideoRef)
  return (
    <div className="flex flex-col h-screen overflow-y-auto bg-gray-900 text-white p-4">
      {/* Video grid */}
      <main className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {participants.map((participant) => (
          <div
            key={participant.user_code}
            className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden"
          > 
            {participant.isSelf && devices.isCameraOn? 
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full"
            />
            :
            participant.image?
            <img
              src={process.env.NEXT_PUBLIC_IMAGE_URL+participant.image}
              alt={participant.name}
              className={`w-full h-full object-contain`}
              />
              :
              <div className="bg-gray-300 h-full w-full text-black text-4xl flex justify-center items-center"> No Image</div>
            }
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
              <Typography variant="body2" className="text-white">
                {participant.name}
                {participant.isSelf && " (You)"}
              </Typography>
            </div>
          </div>
        ))}
      </main>

      {/* Bottom control bar */}
      <AppBar position="static" color="default" elevation={0} sx={{
        backgroundColor:"rgb(24 24 27)",
        color:"white"
      }}>
        <Toolbar className="justify-between">
          {/* Meeting details */}
          <div className="flex items-center">
            <Typography variant="subtitle1" className="mr-4">
              Meeting Name:
            </Typography>
            <Typography variant="subtitle1" className="mr-4">
              {meeting_info.room_name}
            </Typography>
          </div>

          {/* Central controls */}
          <div className="flex space-x-2">
            <Tooltip title={devices.isMicOn ? "Unmute" : "Mute"}>
              <IconButton onClick={()=>handleToggleMic(!devices.isMicOn)} 
                sx={{
                  backgroundColor: "gray.700",
                  "&:hover": {
                    backgroundColor: "gray.600",
                  },
                  color: "white",
                  width: "56px", // equivalent to w-14
                  height: "56px", // equivalent to h-14
                }}
                >
                {!devices.isMicOn ? <MicOffIcon className="h-6 w-6"/> : <MicIcon className="h-6 w-6"/>}
              </IconButton>
            </Tooltip>
            <Tooltip title={devices.isCameraOn ? "Turn on camera" : "Turn off camera"}>
              <IconButton onClick={()=>handleToggleCamera(!devices.isCameraOn)} sx={{
                backgroundColor: "gray.700",
                "&:hover": {
                  backgroundColor: "gray.600",
                },
                color: "white",
                width: "56px", // equivalent to w-14
                height: "56px", // equivalent to h-14
              }}>
                {!devices.isCameraOn ? <VideocamOffIcon className="h-6 w-6"/> : <VideocamIcon className="h-6 w-6"/>}
              </IconButton>
            </Tooltip>
            <Tooltip title="Present now">
              <IconButton sx={{
                backgroundColor: "gray.700",
                "&:hover": {
                  backgroundColor: "gray.600",
                },
                color: "white",
                width: "56px", // equivalent to w-14
                height: "56px", // equivalent to h-14
              }}>
                <PresentToAllIcon className="h-6 w-6"/>
              </IconButton>
            </Tooltip>
            <Tooltip title="More options">
              <IconButton sx={{
                backgroundColor: "gray.700",
                "&:hover": {
                  backgroundColor: "gray.600",
                },
                color: "white",
                width: "56px", // equivalent to w-14
                height: "56px", // equivalent to h-14
              }}>
                <MoreVertIcon className="h-6 w-6"/>
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              color="error"
              startIcon={<CallEndIcon className="h-6 w-6"/>}
              className="bg-red-600 hover:bg-red-700 rounded-full min-w-[150px]"
              onClick={handleEndCall}
            >
              End
            </Button>
          </div>

          {/* Right controls */}
          <div className="flex items-center space-x-2">
            <Tooltip title="Meeting details">
              <IconButton >
                <InfoOutlinedIcon className="text-white h-7 w-7"/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Show everyone">
              <IconButton onClick={toggleSidebar}>
                <Badge badgeContent={participants.length} color="error">
                  <PeopleIcon className="text-white h-7 w-7"/>
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Chat with everyone">
              <IconButton>
                <ChatIcon className="text-white h-7 w-7"/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Turn on captions">
              <IconButton>
                <ClosedCaptionIcon className="text-white h-7 w-7"/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Full screen">
              <IconButton>
                <FullscreenIcon className="text-white h-7 w-7"/>
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer anchor="right" open={isSidebarOpen} onClose={toggleSidebar}>
        <div className="w-80 p-4">
          <Typography variant="h6" className="mb-4">
            Participants
          </Typography>
          <Divider />
          <List>
            {participants.map((participant) => (
              <ListItem key={participant.user_code}>
                <ListItemAvatar>
                  <Avatar src={process.env.NEXT_PUBLIC_IMAGE_URL+participant.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={participant.name}
                  secondary={participant.isSelf ? "You" : ""}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
}
