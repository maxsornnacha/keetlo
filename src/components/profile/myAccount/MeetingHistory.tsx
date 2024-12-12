"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Refresh } from "@mui/icons-material";

// Define the type for a single meeting
interface Meeting {
  user_meeting_history_id: number;
  meeting_code: string;
  meeting_name: string;
  meeting_duration: number; // Now stores duration in seconds
  participants: number;
  created_at: string;
}

// Define the API response type
interface MeetingHistoryResponse {
  data: Meeting[];
}

export const MeetingHistory: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeetingHistory = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error state

      // Make API call to fetch meeting history
      const response = await axios.get<MeetingHistoryResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/users/meeting-history`,
        {
          withCredentials: true, // Include session cookies
        }
      );

      if (response.status === 200 && response.data.data) {
        setMeetings(response.data.data); // Assuming the data structure is { data: [] }
      } else {
        setMeetings([]); // Handle empty data gracefully
        setError("No meeting history found.");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "An error occurred.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Convert seconds to a human-readable format
  const formatDuration = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds} secs`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes < 60) {
      return `${minutes} min${minutes > 1 ? "s" : ""} ${
        remainingSeconds > 0 ? `${remainingSeconds} sec${remainingSeconds > 1 ? "s" : ""}` : ""
      }`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hr${hours > 1 ? "s" : ""} ${
      remainingMinutes > 0 ? `${remainingMinutes} min${remainingMinutes > 1 ? "s" : ""}` : ""
    }`;
  };

  useEffect(() => {
    fetchMeetingHistory();
  }, []);

  return (
    <Card>
      <CardHeader
        title="Meeting History"
        subheader="View your recent meeting activities"
        sx={{ textAlign: "center", bgcolor: "#f5f5f5" }}
      />
      <CardContent>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress color="error" />
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="error">
              {error}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={fetchMeetingHistory}
              sx={{ mt: 2 }}
              className="!shadow-none"
              color="error"
            >
              Retry
            </Button>
          </Box>
        ) : meetings.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6">No meeting history available.</Typography>
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={fetchMeetingHistory}
              sx={{ mt: 2 }}
              className="!shadow-none"
              color="error"
            >
              Refresh
            </Button>
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="meeting history table">
              <TableHead>
                <TableRow sx={{ bgcolor: "#f0f0f0" }}>
                  <TableCell>Meeting Code</TableCell>
                  <TableCell>Meeting Name</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Participants</TableCell>
                  <TableCell>Date Created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {meetings.map((meeting) => (
                  <TableRow key={meeting.user_meeting_history_id}>
                    <TableCell>{meeting.meeting_code}</TableCell>
                    <TableCell>{meeting.meeting_name}</TableCell>
                    <TableCell>{formatDuration(meeting.meeting_duration)}</TableCell>
                    <TableCell>{meeting.participants}</TableCell>
                    <TableCell>
                      {new Date(meeting.created_at).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};
