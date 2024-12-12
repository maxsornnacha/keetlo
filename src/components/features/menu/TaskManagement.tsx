"use client";

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

const features = [
  {
    title: "Real-Time Collaboration",
    description: `Collaborate effortlessly with your team in real-time. Update tasks, add comments, and share files instantly. Stay on the same page without missing a beat, whether your team is in the same room or across the globe.`,
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Drag-and-Drop Interface",
    description: `Simplify task management with an intuitive drag-and-drop interface. Prioritize your workload by easily moving tasks between columns or adjusting deadlines. Organizing your to-do list has never been so seamless.`,
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Progress Tracking",
    description: `Stay on top of your projects with visual progress tracking. Use task statuses, deadlines, and team member assignments to ensure everyone is aligned. Quickly identify bottlenecks and keep the momentum going.`,
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Integrations",
    description: `Integrate your task management seamlessly with calendars, chat tools, and other platforms your team uses daily. Streamline workflows and enhance productivity by keeping everything connected in one place.`,
    image: "https://via.placeholder.com/300x200",
  },
];

export default function TaskManagementFeaturePage() {
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
            Task Management
          </Typography>
          <Typography variant="h6" mt={2}>
            Organize, prioritize, and collaborate on tasks in real-time.
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

      {/* Live Collaboration Banner */}
      <Box
        sx={{
          backgroundColor: "white",
          py: 6,
          textAlign: "center",
          borderTop: "1px solid #e9ecef",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Experience Real-Time Updates
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={4}>
            Watch changes happen live as your team works together. No more refreshing or delays.
          </Typography>
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
            Try Task Management Now
          </button>
        </Container>
      </Box>

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
            Ready to Boost Your Team’s Productivity?
          </Typography>
          <Typography variant="body1" mb={4}>
            Get started with our advanced task management tools today.
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
