"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { AccessTime, People, Videocam } from "@mui/icons-material";
import axios from "axios";

// Define the type for stats data
interface Stats {
  total_duration: number; // In seconds
  total_meetings: number; // Total number of meetings
  total_participants: number; // Total number of participants
}

export function ProfileStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch stats from the API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state

        const response = await axios.get<{ overall: Stats }>(
          `${process.env.NEXT_PUBLIC_API_URL}/users/meeting-stats`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200 && response.data.overall) {
          setStats(response.data.overall);
        } else {
          setError("Failed to load stats.");
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

    fetchStats();
  }, []);

  // Format total meeting time from seconds to "hh:mm" format
  const formatMeetingTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h6">Your Stats</Typography>}
        subheader={
          <Typography variant="body2" color="textSecondary">
            Overview of your activity
          </Typography>
        }
      />
      <Divider />
      <CardContent>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={200}
          >
            <CircularProgress color="error" />
          </Box>
        ) : error ? (
          <Typography
            variant="body2"
            color="error"
            textAlign="center"
            sx={{ mt: 2 }}
          >
            {error}
          </Typography>
        ) : (
          stats && (
            <>
              {/* Total Meeting Time */}
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <AccessTime color="action" />
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Total Meeting Time
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {formatMeetingTime(stats.total_duration)}
                  </Typography>
                </Box>
              </Box>

              {/* Total Meetings */}
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Videocam color="action" />
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Total Meetings
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {stats.total_meetings}
                  </Typography>
                </Box>
              </Box>

              {/* Total Participants */}
              <Box display="flex" alignItems="center" gap={2}>
                <People color="action" />
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Total Participants
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {stats?.total_participants || 0}
                  </Typography>
                </Box>
              </Box>
            </>
          )
        )}
      </CardContent>
    </Card>
  );
}
