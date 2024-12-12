"use client";

import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

export function ProfileHeader() {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            alt="User avatar"
            src="/placeholder-avatar.jpg"
            sx={{ width: 80, height: 80 }}
          >
            JD
          </Avatar>
        }
        title={<Typography variant="h5">John Doe</Typography>}
        subheader={<Typography variant="subtitle1">john.doe@example.com</Typography>}
        action={
          <IconButton aria-label="edit profile">
            <Edit />
          </IconButton>
        }
      />
      <CardContent>
        <form noValidate autoComplete="off">
          <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "1fr 1fr" }}>
            <TextField
              id="firstName"
              label="First Name"
              defaultValue="John"
              fullWidth
              variant="outlined"
            />
            <TextField
              id="lastName"
              label="Last Name"
              defaultValue="Doe"
              fullWidth
              variant="outlined"
            />
          </div>
          <div style={{ marginTop: "16px" }}>
            <TextField
              id="email"
              label="Email"
              defaultValue="john.doe@example.com"
              type="email"
              fullWidth
              variant="outlined"
            />
          </div>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "16px" }}
            >
              Save Changes
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
}
