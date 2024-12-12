"use client";

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

const features = [
  {
    title: "Instant Messaging",
    description: `Stay connected with your team through instant, real-time messaging. Whether it's a quick update or a detailed conversation, our platform ensures seamless communication. Easily share updates, exchange ideas, and stay in sync with your team, all in one place.`,
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Secure Conversations",
    description: `Privacy and security are at the heart of our chat room. With enterprise-grade encryption, you can trust that your conversations remain confidential. Whether you're discussing sensitive business strategies or personal matters, your data is safe with us.`,
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "File Sharing",
    description: `Collaboration is easier than ever with our file-sharing capabilities. Share documents, images, and other files seamlessly during your conversations. No more switching between platforms—everything you need is integrated into one convenient interface.`,
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Multi-Device Support",
    description: `Access your chats from anywhere, whether you're on a desktop, tablet, or mobile device. Our platform is designed to ensure a smooth experience, no matter which device you're using. Stay connected with your team, no matter where you are.`,
    image: "https://via.placeholder.com/300x200",
  },
];

export default function ChatRoomFeaturePage() {
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
            Chat Room
          </Typography>
          <Typography variant="h6" mt={2}>
            Real-time messaging to keep your team connected.
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
          backgroundColor: "#f8f9fa",
          py: 6,
          textAlign: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" fontWeight="bold" mb={3}>
            Ready to Connect?
          </Typography>
          <Typography variant="body1" mb={4}>
            Experience seamless communication with our advanced Chat Room feature.
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
