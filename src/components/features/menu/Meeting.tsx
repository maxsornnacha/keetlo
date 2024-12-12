"use client";

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

const features = [
  {
    title: "HD Video Meetings",
    description: `Experience seamless and crystal-clear video conferencing that ensures your team and clients can communicate effectively. Whether you are hosting large-scale webinars or one-on-one discussions, our platform is optimized for high-definition performance across various devices. Enjoy uninterrupted conversations without the worry of lag or poor video quality.`,
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Real-Time Collaboration",
    description: `Boost team productivity with tools that allow you to collaborate in real time. Share your screen with ease, annotate during presentations, and work on projects together without the hassle of switching between apps. Our platform integrates seamlessly with tools you already use, making collaboration as simple as a click.`,
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Enterprise-Grade Security",
    description: `Your privacy and security are our top priorities. With end-to-end encryption and advanced security protocols, your meetings and data are safe from unauthorized access. Whether you are discussing sensitive business strategies or personal matters, you can trust our platform to protect your information.`,
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Custom Meeting Layouts",
    description: `Every meeting is unique, and so should be the way it looks. Customize your meeting layout to suit your workflow, whether it's for brainstorming sessions, webinars, or team catch-ups. Our flexible interface adapts to your needs, ensuring an organized and productive experience every time.`,
    image: "https://via.placeholder.com/300x200",
  },
];

export default function MeetingFeatures() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: "black",
          color: "white",
          py: 6,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold">
            Meeting Features
          </Typography>
          <Typography variant="h6" mt={2}>
            Discover the powerful tools and features that make Keetlo Meeting the best choice for
            seamless communication and collaboration.
          </Typography>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        {features.map((feature, index) => (
          <Box key={index} sx={{ mb: 6 }}>
            <Image
              src={feature.image}
              alt={feature.title}
              width={800}
              height={400}
              style={{ width: "100%", height: "auto", marginBottom: "16px" }}
            />
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {feature.title}
            </Typography>
            <Typography variant="body1" lineHeight={1.8}>
              {feature.description}
            </Typography>
          </Box>
        ))}
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          backgroundColor: "#f8f9fa",
          py: 6,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="bold" mb={3}>
            Ready to Start Your Next Meeting?
          </Typography>
          <Typography variant="body1" mb={4}>
            Sign up now and get access to all our advanced meeting features. Start collaborating
            like never before!
          </Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <button
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Sign Up Now
            </button>
            <button
              style={{
                backgroundColor: "white",
                color: "red",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "2px solid red",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Learn More
            </button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
