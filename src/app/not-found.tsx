"use client";

import React from "react";
import { Button, Typography, Container, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        color: "black",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Container maxWidth="sm">
        <div className="flex justify-center">
        <Image
          src="/images/404/404-image.png" // Replace with your image
          alt="404 Illustration"
          width={300}
          height={300}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "20px",
          }}
        />
        </div>
        <Typography variant="h2" sx={{ fontWeight: "bold", marginBottom: "16px" }}>
          404: Page Not Found
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: "24px", color: "gray" }}>
          Oops! It seems like you've wandered into uncharted territory.
        </Typography>
        <Link href={"/"}>
        <button
          className="bg-red-500 hover:bg-red-700 text-white p-4 rounded-lg"
        >
          Go Back to Homepage
        </button>
        </Link>
      </Container>
    </Box>
  );
}
