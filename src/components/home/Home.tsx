"use client"
import React, { useState } from "react";
import { Button, Typography, Container, Grid, Card, CardContent, Box, TextField } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faVideo,
    faShareSquare,
    faLock,
  } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const cards = [
        {
            title: "Organization",
            description: "Applicant interview and meeting in the team",
            image: "https://lh3.googleusercontent.com/0prQ29KXWxm3p0ufwXYejNmgHR6Ng6wOxKZfh2VFqZxk2W1hvh7683C5hiPzkMzYnPNqhq6aUxIyp_aHgJsNtAPTSQTL_kbg0KoPyAqnJtMd7K5VqEWf=w480-rw",
            color: "bg-black text-white"
        },
        {
          title: "Education",
          description: "Teach online and empower students",
          image: "https://lh3.googleusercontent.com/0prQ29KXWxm3p0ufwXYejNmgHR6Ng6wOxKZfh2VFqZxk2W1hvh7683C5hiPzkMzYnPNqhq6aUxIyp_aHgJsNtAPTSQTL_kbg0KoPyAqnJtMd7K5VqEWf=w480-rw",
          color: "bg-black text-white"
        },
        {
          title: "Retail",
          description: "Improve sales with video shopping",
          image: "https://lh3.googleusercontent.com/0prQ29KXWxm3p0ufwXYejNmgHR6Ng6wOxKZfh2VFqZxk2W1hvh7683C5hiPzkMzYnPNqhq6aUxIyp_aHgJsNtAPTSQTL_kbg0KoPyAqnJtMd7K5VqEWf=w480-rw",
          color: "bg-black text-white"
        },
        {
          title: "Banking",
          description: "Build better customer relationships",
          image: "https://lh3.googleusercontent.com/0prQ29KXWxm3p0ufwXYejNmgHR6Ng6wOxKZfh2VFqZxk2W1hvh7683C5hiPzkMzYnPNqhq6aUxIyp_aHgJsNtAPTSQTL_kbg0KoPyAqnJtMd7K5VqEWf=w480-rw",
          color: "bg-black text-white"
        },
        {
          title: "Government",
          description: "Improve inter-agency communication",
          image: "https://lh3.googleusercontent.com/0prQ29KXWxm3p0ufwXYejNmgHR6Ng6wOxKZfh2VFqZxk2W1hvh7683C5hiPzkMzYnPNqhq6aUxIyp_aHgJsNtAPTSQTL_kbg0KoPyAqnJtMd7K5VqEWf=w480-rw",
          color: "bg-black text-white"
        },
        {
          title: "Healthcare",
          description: "Provide remote medical consultations",
          image: "https://lh3.googleusercontent.com/0prQ29KXWxm3p0ufwXYejNmgHR6Ng6wOxKZfh2VFqZxk2W1hvh7683C5hiPzkMzYnPNqhq6aUxIyp_aHgJsNtAPTSQTL_kbg0KoPyAqnJtMd7K5VqEWf=w480-rw",
          color: "bg-black text-white"
        },
    ];

    const faqItems = [
          {
            question: "Is GoTo Meeting the same as GoToMeeting?",
            answer: "Yes, GoTo Meeting and GoToMeeting are the same platform designed for online meetings.",
          },
          {
            question: "Is GoTo Meeting HIPAA compliant?",
            answer: "Yes, GoTo Meeting complies with HIPAA regulations when used with the appropriate settings.",
          },
          {
            question: "Can I integrate GoTo Meeting with my conference room?",
            answer: "Absolutely. GoTo Meeting offers hardware and software solutions for conference room integrations.",
          },
          {
            question: "How much does GoTo Meeting cost? Is there a free version?",
            answer: "GoTo Meeting offers multiple pricing tiers, and there's a free trial version available.",
          },
          {
            question: "How does the GoTo Meeting free trial work?",
            answer: "The free trial provides full access to the platform's features for a limited time, typically 14 days.",
          },
          {
            question: "Is Join.Me now a part of GoTo Meeting?",
            answer: "Yes, Join.Me has been merged into the GoTo Meeting family to provide a seamless meeting experience.",
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
                Online meeting software for all your video conferencing & webinar needs
                </Typography>
                <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 4 }}>
                Keetlo Meeting is a secure platform that helps you connect, collaborate, and host webinars with ease.
                </Typography>
                {/* Video Banner */}
                <Box
                    sx={{
                        margin: '20px auto',
                        maxWidth: '800px',
                        height: '450px',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '8px',
                    }}
                >
                    <video
                        width="100%"
                        height="100%"
                        controls={false}
                        autoPlay
                        muted
                        loop
                        style={{
                            objectFit: 'cover', // Ensures the video scales nicely
                        }}
                    >
                        <source src="/videos/home/home-video-banner.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Box>
            </Container>
            </Box>

            <div className="p-28">
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-6">
                    <div className="max-w-[600px] space-y-4">
                    <h1 className="text-4xl">Trusted by enterprises around the world.</h1>
                    <p>Take advantage of the same secure-by-design infrastructure, built-in protection, and global network that Google uses to secure your information and safeguard your privacy. Meet video meetings are encrypted in transit and our array of default-on anti-abuse measures keep your meetings safe.</p>
                    </div>
                </div>
                <div className="col-span-6">
                    <Image
                    height={400}
                    width={400}
                    src={"https://lh3.googleusercontent.com/0prQ29KXWxm3p0ufwXYejNmgHR6Ng6wOxKZfh2VFqZxk2W1hvh7683C5hiPzkMzYnPNqhq6aUxIyp_aHgJsNtAPTSQTL_kbg0KoPyAqnJtMd7K5VqEWf=w480-rw"}
                    alt="image-1"
                    />
                </div>
            </div>
            </div>

            <div className="p-28 bg-gray-100">
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-6">
                    <Image
                    height={500}
                    width={500}
                    src={"https://lh3.googleusercontent.com/7IADB3qboszfxEYMsB2SwAT1g6mjzmt_sqLp6YkTbSrioiztaeBmDZ0eC-NqZeSSH3IQHWLpXkHj9ldJxPFh3scod5PdYfb-qNfBfiDjXf4k0JIDrD0=w960-rw"}
                    alt="image-1"
                    />
                </div>
                <div className="col-span-6">
                    <div className="max-w-[600px] space-y-4">
                    <h1 className="text-4xl">Designed to be helpful.</h1>
                    <p>Join meetings directly from a Calendar event, an email invite, or directly from Gmail. All of the event details are right there when you need them, whether you’re joining from a computer, phone, or conference room. Helpful features like live captions, low-light mode, and noise cancellation make meetings more productive.</p>
                    </div>
                </div>
            </div>
            </div>
    
          {/* Features Section */}
          <Container style={{ padding: "50px 0" }}>
            <Typography variant="h4" style={{ textAlign: "center", marginBottom: "30px" }}>
              Features
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <div className="text-red-500 text-center text-4xl mb-4">
                        <FontAwesomeIcon icon={faVideo} />
                    </div>
                    <Typography variant="h6">HD Video Meetings</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Experience crystal-clear video conferencing with advanced tools.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <div className="text-red-500 text-center text-4xl mb-4">
                        <FontAwesomeIcon icon={faShareSquare} />
                    </div>
                    <Typography variant="h6">Screen Sharing</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Easily share your screen for presentations and collaborations.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <div className="text-red-500 text-center text-4xl mb-4">
                        <FontAwesomeIcon icon={faLock} />
                    </div>
                    <Typography variant="h6">Secure Access</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Keep your meetings private with enterprise-grade security.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>

          <div className="py-28">
            <div className="grid grid-cols-2 gap-4 space-y-4 pb-28 px-28">
                <h2 className="text-3xl font-bold text-center mb-6 max-w-[500px]">Unifying business communication across sectors</h2>
                <p>Our online meeting software is flexible enough to meet growing video conferencing needs across industries. Connect, collaborate, and empower your business to stand out in your industry with our secure web meeting software.</p>
            </div>
            <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={30}
            slidesPerView={4}
            navigation
            autoplay
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            >
                {cards.map((card, index) => (
                <SwiperSlide key={index} className="h-full">
                    <div className={`${card.color} min-h-[230px] shadow-md rounded-lg overflow-hidden h-full`}>
                    <div className="p-16">
                        <h3 className="font-bold text-2xl">{card.title}</h3>
                        <p className="text-white mt-2">{card.description}</p>
                    </div>
                    </div>
                </SwiperSlide>
                ))}
            </Swiper>
            </div>
    
          {/* Testimonials Section */}
          <div style={{ backgroundColor: "#f8f9fa", padding: "50px 0" }}>
            <Container>
              <Typography variant="h4" style={{ textAlign: "center", marginBottom: "30px" }}>
                What Our Users Say
              </Typography>
              <Typography variant="body1" style={{ textAlign: "center", color: "#6c757d" }}>
                "Mama Meeting has transformed the way we collaborate remotely!"
              </Typography>
            </Container>
          </div>

          {/* FAQ */}
          <div className="max-w-4xl mx-auto py-12">
            <h2 className="text-3xl font-bold text-center mb-8">FAQs</h2>
            <div className="flex justify-end mb-4">
                <button
                onClick={() => setExpandedIndex(null)}
                className="text-blue-500 hover:underline"
                >
                Hide All
                </button>
            </div>
            {faqItems.map((item, index) => (
                <div
                key={index}
                className="border-b border-gray-300 py-4 cursor-pointer"
                >
                <div
                    className="flex justify-between items-center"
                    onClick={() => toggleFAQ(index)}
                >
                    <h3 className="text-lg font-medium">{item.question}</h3>
                    <span>
                    {expandedIndex === index ? "▲" : "▼"}
                    </span>
                </div>
                {expandedIndex === index && (
                    <p className="text-gray-600 mt-2">{item.answer}</p>
                )}
                </div>
            ))}
            </div>
        </div>
      );
}