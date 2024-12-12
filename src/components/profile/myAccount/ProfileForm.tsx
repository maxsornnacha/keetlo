"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  TextField,
  Grid,
  Autocomplete,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import timezones from "@/utils/timezone";
import { useSelector } from "react-redux";
import { fetchUserLoginStatus } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import axios from "axios";
import "cropperjs/dist/cropper.css";
import Cropper, { ReactCropperElement } from "react-cropper";

export function ProfileForm() {
  const dispatch = useAppDispatch();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  const [selectedTimezone, setSelectedTimezone] = useState<string>("Asia/Bangkok");
  const [fullName, setFullName] = useState<string>(user?.name || "");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [image, setImage] = useState<string | null>(null);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchUserLoginStatus());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setSelectedTimezone(user.timezone || "Asia/Bangkok");
    }
  }, [user]);

  const handleTimezoneChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    setSelectedTimezone(value || ""); // Use empty string if null
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setOpenDialog(true); // Open the cropping dialog
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleCrop = async () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      try {
        const croppedCanvas = cropper.getCroppedCanvas();
        if (!croppedCanvas) {
          throw new Error("Cropper canvas is not initialized properly.");
        }

        const croppedImage = croppedCanvas.toDataURL();
        setImage(croppedImage);
        setOpenDialog(false);

      } catch (error) {
        console.log("Error updating photo:", error);
        setSnackbarMessage("An error occurred while updating the photo.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!fullName){
      setSnackbarMessage("Failed to update profile. Your name can not be empty");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    else if(!selectedTimezone){
      setSnackbarMessage("Failed to update profile. Your timezone can not be empty");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    else{
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/update-profile`,
        {
          name: fullName,
          timezone: selectedTimezone,
          image: image ? image : user?.image
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setSnackbarMessage("Profile updated successfully.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        dispatch(fetchUserLoginStatus());
      } else {
        setSnackbarMessage("Failed to update profile.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.log("Error updating profile:", error);
      setSnackbarMessage("An error occurred while updating the profile.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    }
  };

  if (loading) return <></>;

  return (
    <>
      <Card>
        <CardHeader
          title="Personal Information"
          subheader="Update your photo and personal details here."
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} display="flex" alignItems="center" gap={2}>
                {image || user?.image ?
                <Avatar
                  alt="Profile picture"
                  src={image || `${process.env.NEXT_PUBLIC_IMAGE_URL}${user?.image}` || "/default-avatar.png"}
                  className="bg-gray-500"
                  sx={{ width: 80, height: 80 }}
                />
                :
                <Avatar
                  alt="Profile picture"
                  className="bg-gray-500"
                  sx={{ width: 80, height: 80 }}
                >
                  {user?.name?.slice(0, 1)}
                </Avatar>
                }
                <div>
                  <div>User ID: {user?.user_code}</div>
                  <Button variant="outlined" component="label" color="error">
                    Change Photo
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageChange}
                    />
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  variant="outlined"
                  inputProps={{
                    maxLength: 100, // Limits the input to 100 characters
                  }}
                  helperText={`${fullName.length}/100`} // Optional: shows current character count
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={timezones}
                  getOptionLabel={(option) => option}
                  value={selectedTimezone}
                  onChange={handleTimezoneChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Timezone" variant="outlined" />
                  )}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <button
                  type="submit"
                  disabled={
                    user?.name === fullName && 
                    user?.timezone === selectedTimezone &&
                    !image 
                  }
                  className={`p-4 rounded-md text-white ${
                    user?.name === fullName && 
                    user?.timezone === selectedTimezone &&
                    !image
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-700"
                  }`}
                >
                  Save Changes
                </button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Crop your photo</DialogTitle>
        <DialogContent>
          <Cropper
            src={image || ""}
            style={{ height: 400, width: "100%" }}
            aspectRatio={1}
            guides={false}
            viewMode={1}
            autoCropArea={1}
            background={false}
            responsive
            ref={cropperRef}
          />
          <div className="flex flex-wrap gap-2 mt-4">
            <Button variant="outlined" color="error" onClick={() => cropperRef.current?.cropper.rotate(-90)}>
              Rotate Left
            </Button>
            <Button variant="outlined" color="error" onClick={() => cropperRef.current?.cropper.rotate(90)}>
              Rotate Right
            </Button>
            <Button variant="outlined" color="error" onClick={() => cropperRef.current?.cropper.zoom(0.1)}>
              Zoom In
            </Button>
            <Button variant="outlined" color="error" onClick={() => cropperRef.current?.cropper.zoom(-0.1)}>
              Zoom Out
            </Button>
            <Button variant="outlined" color="error" onClick={() => cropperRef.current?.cropper.scaleX(-1)}>
              Flip Horizontal
            </Button>
            <Button variant="outlined" color="error" onClick={() => cropperRef.current?.cropper.scaleY(-1)}>
              Flip Vertical
            </Button>
          </div>
        </DialogContent>
        <DialogActions className="flex gap-4">
          <button onClick={handleDialogClose} >
            Cancel
          </button>
          <button onClick={handleCrop} className="px-8 bg-red-500 hover:bg-red-700 py-2 text-white rounded-md">
            Save
          </button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
