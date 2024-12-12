"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";

export default function NewMeeting() {
  const [open, setOpen] = useState(false);
  const [meetingName, setMeetingName] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [unlimited, setUnlimited] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMeetingName("");
    setDescription("");
    setHours(0);
    setMinutes(0);
    setUnlimited(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCreateMeeting = async () => {
    if (!meetingName.trim()) {
      setSnackbarMessage("Meeting name is required!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const duration =
      unlimited || (hours === 0 && minutes === 0)
        ? "Unlimited"
        : `${hours}h ${minutes}m`;

    const meetingData = {
      name: meetingName,
      description: description || "No description provided",
      duration: duration,
    };

    try {
      // Send POST request to the API
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/meetings/create`,
        meetingData,
        { withCredentials: true }
      );

      console.log(response.status)
      if (response.status === 200) {
        setSnackbarMessage("Meeting created successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        // Close the dialog
        handleClose();

        // Redirect to the newly created room page
        const { roomCode } = response.data; // Assuming the response contains `roomCode`
        window.location.href = `/room/${roomCode}`;
      } else {
        setSnackbarMessage("Failed to create the meeting.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error : any) {
      setSnackbarMessage(error?.response?.data?.message || "An error occurred while creating the meeting.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <button
        className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-700"
        onClick={handleOpen}
      >
        New meeting
      </button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create a New Meeting</DialogTitle>
        <DialogContent>
          <TextField
            label="Meeting Name"
            required
            fullWidth
            margin="normal"
            value={meetingName}
            onChange={(e) => setMeetingName(e.target.value)}
            inputProps={{
              maxLength: 50,
            }}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
          />
          <Grid container spacing={2} alignItems="center" marginTop={2}>
            <Grid item xs={6}>
              <FormControl fullWidth disabled={unlimited}>
                <InputLabel>Hours</InputLabel>
                <Select
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                >
                  {[...Array(24).keys()].map((hour) => (
                    <MenuItem key={hour} value={hour}>
                      {hour} {hour === 1 ? "Hour" : "Hours"}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth disabled={unlimited}>
                <InputLabel>Minutes</InputLabel>
                <Select
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                >
                  {[0, 15, 30, 45].map((minute) => (
                    <MenuItem key={minute} value={minute}>
                      {minute} {minute === 1 ? "Minute" : "Minutes"}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <FormControlLabel
            control={
              <Checkbox
                checked={unlimited}
                onChange={(e) => {
                  setUnlimited(e.target.checked);
                  if (e.target.checked) {
                    setHours(0);
                    setMinutes(0);
                  }
                }}
              />
            }
            label="Unlimited duration"
            sx={{ color: "black" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: "red",
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            Cancel
          </Button>
          <button
            onClick={handleCreateMeeting}
            className="bg-red-500 px-4 py-2 hover:bg-red-700 text-white rounded-md"
          >
            Create a new room
          </button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for alerts */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity as "success" | "error"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
