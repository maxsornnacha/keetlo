"use client";

import React from "react";
import { Box, Container, Typography, Grid, Card, CardContent, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const supportTopics = [
  {
    title: "Announcements",
    description: "We've got our ear to the ground. Here's what you need to know.",
    icon: "https://via.placeholder.com/64", // Replace with the actual icon URL
  },
  {
    title: "Discord Basics",
    description: "Start off on the right foot! Not the left one!",
    icon: "https://via.placeholder.com/64",
  },
  {
    title: "Account Settings",
    description: "You're a special snowflake and so is your account.",
    icon: "https://via.placeholder.com/64",
  },
  {
    title: "Server Settings",
    description: "Almost as exciting as interior decorating.",
    icon: "https://via.placeholder.com/64",
  },
  {
    title: "Nitro, Shop & Server Boosting",
    description: "Please don't shop until you drop. Let us help.",
    icon: "https://via.placeholder.com/64",
  },
  {
    title: "Quests & Promotions",
    description: "Welcome, weary traveler! Would you like to see our quests?",
    icon: "https://via.placeholder.com/64",
  },
  {
    title: "Payments & Billing",
    description: "That feel when you look at your bank account.",
    icon: "https://via.placeholder.com/64",
  },
  {
    title: "Safety, Privacy & Policy",
    description: "Keep things safe & sound for you and your buddies.",
    icon: "https://via.placeholder.com/64",
  },
  {
    title: "Known Issues, Bugs & Troubleshooting",
    description: "All you can eat self-serve problem solving.",
    icon: "https://via.placeholder.com/64",
  },
];

const additionalSupport = [
  {
    title: "Game Developers",
    description: "Main hub for supporting game development with our API and SDK.",
    icon: "https://via.placeholder.com/64",
  },
  {
    title: "Apps Center",
    description: "Discover, use, and add Apps as a Discord user.",
    icon: "https://via.placeholder.com/64",
  },
  {
    title: "Twitter",
    description: "Got urgent questions? Contact us on Twitter!",
    icon: "https://via.placeholder.com/64",
  },
];

export default function Support() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Header Section */}
      <Box
        sx={{
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          padding: "50px 0",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" mb={2}>
            Help center
          </Typography>
          <TextField
            fullWidth
            placeholder="Search for help"
            sx={{ backgroundColor: "white", borderRadius: "4px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Container>
      </Box>

      {/* Support Topics */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          Need help? We&apos;ve got your back.
        </Typography>
        <Grid container spacing={4}>
          {supportTopics.map((topic, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: "center", padding: "20px" }} className="border border-gray-200 hover:bg-gray-50">
                <CardContent>
                  <div className="flex justify-center">
                  <img src={topic.icon} alt={topic.title} style={{ marginBottom: "16px" }} />
                  </div>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {topic.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {topic.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Additional Support */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
            The other ways to get help
        </Typography>
        <Grid container spacing={4}>
          {additionalSupport.map((support, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: "center", padding: "20px" }} className="border border-gray-200 hover:bg-gray-50">
                <CardContent>
                  <div className="flex justify-center">
                  <img src={support.icon} alt={support.title} style={{ marginBottom: "16px" }} />
                  </div>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {support.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {support.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
