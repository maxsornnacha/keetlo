"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import axios from "axios";
import { AxiosError } from "axios";

interface Session {
  device: string;
  location: string;
  ip: string;
  last_active: string;
}

export function LoggedInSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/sessions`, {
          withCredentials: true,
        });
        setSessions(response.data);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          // Now you have access to properties like `response`, `data`, etc.
          console.log("Error fetching sessions (AxiosError):", error?.response?.data?.message);
        } else if (error instanceof Error) {
          // This handles any other general errors
          console.log("Error fetching sessions (General Error):", error.message);
        } else {
          console.log("Unknown error occurred:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h6">Where You&apos;re Logged In</Typography>}
        subheader={
          <Typography variant="body2" color="textSecondary">
            Manage your active sessions
          </Typography>
        }
      />
      <CardContent>
        {loading ? (
          <Typography variant="body2" color="textSecondary">
            Loading sessions...
          </Typography>
        ) : sessions.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            No active sessions found.
          </Typography>
        ) : (
          <List>
            {sessions.map((session, index) => (
              <div key={index}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        {session.device} - {session.location}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="textSecondary">
                        IP: {session.ip} | Last Active:{" "}
                        {new Date(session.last_active).toLocaleString()}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < sessions.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}
