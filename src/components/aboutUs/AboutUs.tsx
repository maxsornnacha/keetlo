"use client";

import React from "react";
import { Box, Typography, Container, Grid, Card, CardContent, Avatar } from "@mui/material";

const teamMembers = [
  {
    name: "Jane Doe",
    role: "CEO & Founder",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "John Smith",
    role: "CTO",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Emily Brown",
    role: "Marketing Head",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Michael Green",
    role: "Product Manager",
    image: "https://via.placeholder.com/150",
  },
];

export default function AboutUs() {
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
            About Us
          </Typography>
          <Typography variant="h6" mt={2}>
            Learn more about our mission, values, and the amazing team behind our success.
          </Typography>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          Our Mission
        </Typography>
        <Typography variant="body1" textAlign="center" mb={4}>
          Our mission is to empower individuals and organizations with seamless video conferencing
          and collaboration tools to connect and innovate like never before.
        </Typography>
      </Container>

      {/* Values Section */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          Our Values
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Innovation
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  We embrace cutting-edge technology to bring you the most advanced collaboration tools.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Customer Focus
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Your needs inspire our solutions. We are dedicated to delivering the best experience.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Integrity
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  We operate with transparency and strive to uphold the highest ethical standards.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* History Section */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          Our History
        </Typography>
        <Typography variant="body1" textAlign="center" mb={4}>
          Founded in 2021, our company started with a vision to transform the way people connect
          and collaborate. Today, we are proud to serve millions of users worldwide.
        </Typography>
      </Container>

      {/* Team Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ textAlign: "center" }}>
                <CardContent>
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    sx={{ width: 100, height: 100, margin: "0 auto", mb: 2 }}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Location Section */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          Our Location
        </Typography>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body1" textAlign="center">
              <strong>Head Office:</strong> <br />
              123 Main Street, Downtown City, Country <br />
              Zip Code: 12345
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <iframe
              title="Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345097656!2d144.95373631590473!3d-37.81627974202101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5225b655ab%3A0xb1b5b13bfe7f5bd1!2sMelbourne%20CBD%20Office!5e0!3m2!1sen!2sau!4v1677639575215!5m2!1sen!2sau"
              width="100%"
              height="300"
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </Grid>
        </Grid>
      </Container>

      {/* Contact Section */}
      <Box sx={{ backgroundColor: "#e9ecef", py: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
            Get in Touch
          </Typography>
          <Typography variant="body1" textAlign="center">
            Have questions? Feel free to contact us at{" "}
            <a href="mailto:contact@example.com" style={{ color: "blue" }}>
              contact@example.com
            </a>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
