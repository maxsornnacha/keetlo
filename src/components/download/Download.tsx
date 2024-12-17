"use client"
import React from "react";
import { Typography, Container, Grid, Card, CardContent, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindows,
  faAndroid,
  faApple
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Download() {
  const downloadOptions = [
    {
      title: "Windows",
      icon: faWindows,
      description: "Download for Windows 7, 8, 10, 11",
      buttonText: "Download for Windows",
      link: "#windows-download"
    },
    {
      title: "Android",
      icon: faAndroid,
      description: "Get it on Google Play",
      buttonText: "Download for Android",
      link: "#android-download"
    },
    {
      title: "iOS",
      icon: faApple,
      description: "Download on the App Store",
      buttonText: "Download for iOS",
      link: "#ios-download"
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: 'black',
          color: 'white',
          padding: '50px 0',
          textAlign: 'center',
        }}
      >
        <Container>
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
            Download Keetlo Meeting
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 4 }}>
            Get started with our secure video conferencing platform on your preferred device.
          </Typography>
        </Container>
      </Box>

      {/* Download Options */}
      <Container style={{ padding: "50px 8px" }}>
        <Typography variant="h4" style={{ textAlign: "center", marginBottom: "30px" }}>
          Choose Your Platform
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {downloadOptions.map((option, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <div className="text-red-500 text-center text-4xl mb-4">
                    <FontAwesomeIcon icon={option.icon} />
                  </div>
                  <Typography variant="h6">{option.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {option.description}
                  </Typography>
                  <Link href={option.link}>
                  <button
                   className="bg-red-500 hover:bg-red-700 text-white p-4 rounded-lg w-full mt-8"
                  >
                    {option.buttonText}
                  </button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* System Requirements */}
      <div className="bg-gray-100 py-16 px-8">
        <Container>
          <Typography variant="h4" style={{ textAlign: "center", marginBottom: "30px" }}>
            System Requirements
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Windows</Typography>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Windows 7, 8, 10, or 11</li>
                    <li>2 GB RAM</li>
                    <li>2 GHz dual-core processor</li>
                    <li>1 GB free disk space</li>
                  </ul>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Android</Typography>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Android 6.0 or later</li>
                    <li>1 GB RAM</li>
                    <li>1.5 GHz processor</li>
                    <li>100 MB free storage</li>
                  </ul>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">iOS</Typography>
                  <ul className="list-disc pl-5 mt-2">
                    <li>iOS 12.0 or later</li>
                    <li>Compatible with iPhone, iPad, and iPod touch</li>
                    <li>100 MB free storage</li>
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>

      {/* Installation Guide */}
      <Container style={{ padding: "50px 16px" }}>
        <Typography variant="h4" style={{ textAlign: "center", marginBottom: "30px" }}>
          Quick Installation Guide
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Windows</Typography>
            <ol className="list-decimal pl-5">
              <li className="mb-2">Download the Windows installer.</li>
              <li className="mb-2">Run the installer and follow the on-screen instructions.</li>
              <li className="mb-2">Launch Keetlo Meeting after installation.</li>
              <li>Sign in with your account and start your first meeting.</li>
            </ol>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Android</Typography>
            <ol className="list-decimal pl-5">
              <li className="mb-2">Open Google Play Store on your device.</li>
              <li className="mb-2">Search for &quot;Keetlo Meeting&quot; and tap Install.</li>
              <li className="mb-2">Open the app after installation.</li>
              <li>Sign in and start using Keetlo Meeting.</li>
            </ol>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>iOS</Typography>
            <ol className="list-decimal pl-5">
              <li className="mb-2">Open the App Store on your iOS device.</li>
              <li className="mb-2">Search for &quot;Keetlo Meeting&quot; and tap Get.</li>
              <li className="mb-2">Open the app after it&quot;s installed.</li>
              <li>Sign in with your account to begin.</li>
            </ol>
          </Grid>
        </Grid>
      </Container>

      {/* Support Section */}
      <div className="bg-gray-100 py-16">
        <Container>
          <Typography variant="h4" style={{ textAlign: "center", marginBottom: "30px" }}>
            Need Help?
          </Typography>
          <Typography variant="body1" style={{ textAlign: "center", marginBottom: "20px" }}>
            If you encounter any issues during download or installation, our support team is here to help.
          </Typography>
          <div className="text-center">
            <Link href="/support">
            <button 
             className="bg-red-500 hover:bg-red-700 text-white p-4 rounded-lg"
            >
              Contact Support
            </button>
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}

