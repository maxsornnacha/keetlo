"use client";

import React, { useState } from "react";
import { Avatar, Menu, MenuItem, IconButton, Typography, Divider, Snackbar, Alert } from "@mui/material";
import { AccountCircle, Settings, Logout } from "@mui/icons-material";
import axios from "axios";
import { AxiosError } from "axios";

interface User {
    id: string;
    user_code: string;
    name: string;
    email: string;
    image?: string; 
    google_email: string,
    facebook_email: string,
    apple_email: string,
    timezone: string,
}

interface ProfileMenuProps {
    user: User | null;
}

export function ProfileMenu({ user }: ProfileMenuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // Snackbar state
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleRedirectToMyAccount = () => {
        window.location.href = "/my-account";
    }

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
                withCredentials: true, // Include cookies in the request
            });

            if (response.status === 200) {
                setSnackbarMessage(response.data.message || "Logout successful");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);

                setTimeout(() => {
                    window.location.href = "/"; // Redirect to the homepage
                }, 1500);
            } else {
                setSnackbarMessage("Logout failed. Please try again.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        } catch (error: unknown) {
            let errorMessage = "Error logging out. Please try again.";
        
            if (error instanceof AxiosError) {
                // AxiosError has a `response` object with `data`, so you can access the error message.
                errorMessage = error?.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                // For general errors, access the `message` property.
                errorMessage = error.message;
            }
        
            // Set Snackbar state and log the error
            setSnackbarMessage(errorMessage);
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        
            console.log("Error logging out:", error instanceof AxiosError ? error?.response?.data : error instanceof Error ? error.message : error);
        }
    };

    return (
        <>
            <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? "profile-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >   {user?.image ?
                <Avatar className="bg-gray-500" src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${user.image}?t=${new Date().getTime()}`}></Avatar>
                :
                <Avatar className="bg-gray-500">{user?.name?.slice(0, 1)}</Avatar>
                }
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="profile-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <div className="p-4">
                    <div>
                        <Typography variant="subtitle1" className="max-w-96 break-words">{user?.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user?.email}
                        </Typography>
                    </div>
                </div>
                <Divider />
                <MenuItem onClick={handleRedirectToMyAccount}>
                    <AccountCircle fontSize="small" sx={{ mr: 2 }} />
                    Profile 
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Settings fontSize="small" sx={{ mr: 2 }} />
                    Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <Logout fontSize="small" sx={{ mr: 2 }} />
                    Log out
                </MenuItem>
            </Menu>

            {/* Snackbar for success or error messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000} // Automatically hide after 3 seconds
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position: Top-Center
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
