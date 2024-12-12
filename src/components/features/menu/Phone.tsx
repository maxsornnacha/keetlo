"use client";

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

const features = [
  {
    title: "Unified Communication",
    description: `Combine phone calls with chat, video, and meetings to create a truly unified communication experience. Streamline workflows and enhance collaboration by bringing all your communication tools under one platform.`,
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "High-Quality Audio",
    description: `Experience crystal-clear audio during calls, thanks to our advanced noise reduction technology. Whether you're in a quiet office or a bustling environment, enjoy uninterrupted and distortion-free communication.`,
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Call Recording",
    description: `Never miss a detail with our call recording feature. Perfect for training sessions, compliance requirements, or simply keeping a reference for important conversations. Manage your recordings securely and access them anytime.`,
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Multi-Device Support",
    description: `Stay connected wherever you are. With multi-device support, you can make and receive calls on your phone, tablet, or computer. Enjoy seamless synchronization and uninterrupted communication across all your devices.`,
    image: "https://via.placeholder.com/300x200",
  },
];

export default function PhoneIntegrationFeaturePage() {
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
            Phone Integration
          </Typography>
          <Typography variant="h6" mt={2}>
            Stay connected with seamless phone call integration.
          </Typography>
        </Container>
      </Box>

      {/* Feature Details Section */}
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

      {/* Call to Action Section */}
      <Box
        sx={{
          backgroundColor: "black",
          color: "white",
          py: 6,
          textAlign: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" fontWeight="bold" mb={3}>
            Ready to Elevate Your Calls?
          </Typography>
          <Typography variant="body1" mb={4}>
            Discover the power of phone integration and revolutionize the way you communicate.
          </Typography>
          <Box>
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
              Learn More
            </button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
