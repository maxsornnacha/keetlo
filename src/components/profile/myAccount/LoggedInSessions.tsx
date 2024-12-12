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
      } catch (error : any) {
        console.log("Error fetching sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h6">Where You're Logged In</Typography>}
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
