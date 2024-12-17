import { Container, Box, Grid, Typography, Link } from "@mui/material";
import {
    Facebook,
    Twitter,
    LinkedIn,
    YouTube,
    Instagram,
  } from "@mui/icons-material";
  
export default function Footer(){
    return (
        <footer
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "40px 20px",
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {/* Company Section */}
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  COMPANY
                </Typography>
                <Box>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    About Us
                  </Link>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    Why GoTo
                  </Link>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    Blog
                  </Link>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    Careers <span style={{ fontWeight: "bold" }} className="text-red-500">WE&apos;RE HIRING</span>
                  </Link>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    Contact Us
                  </Link>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    Trust & Security
                  </Link>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    Press
                  </Link>
                </Box>
              </Grid>
    
              {/* Resources Section */}
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  RESOURCES
                </Typography>
                <Box>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    Resource Center
                  </Link>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    Integrations
                  </Link>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    Become a Partner
                  </Link>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    Glossary
                  </Link>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    Support
                  </Link>
                </Box>
              </Grid>
    
              {/* Products Section */}
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  PRODUCTS
                </Typography>
                <Box>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    Communication & Collaboration
                  </Link>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    GoTo Connect
                  </Link>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    GoTo Contact Center
                  </Link>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    GoTo Meeting
                  </Link>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    GoTo Webinar
                  </Link>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    GoTo Room
                  </Link>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    GoTo Training
                  </Link>
                </Box>
              </Grid>
    
              {/* Remote Access Section */}
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  REMOTE ACCESS & SUPPORT
                </Typography>
                <Box>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    GoTo Resolve
                  </Link>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    LogMeIn Rescue
                  </Link>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    GoToMyPC
                  </Link>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    Central
                  </Link>
                  <Link href="#" style={{ color: "white", display: "block", margin: "8px 0" }}>
                    Miradore
                  </Link>
                </Box>
              </Grid>
            </Grid>
    
            {/* Social Media Links */}
            <Box
              sx={{
                textAlign: "center",
                marginTop: "40px",
                borderTop: "1px solid #444",
                paddingTop: "20px",
              }}
            >
              <Typography variant="body2" style={{ marginBottom: "10px" }}>
                FOLLOW & SHARE GOTO:
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                <Link href="#" style={{ color: "white" }}>
                    <Facebook />
                </Link>
                <Link href="#" style={{ color: "white" }}>
                    <Twitter />
                </Link>
                <Link href="#" style={{ color: "white" }}>
                    <LinkedIn />
                </Link>
                <Link href="#" style={{ color: "white" }}>
                    <YouTube />
                </Link>
                <Link href="#" style={{ color: "white" }}>
                    <Instagram />
                </Link>
               </Box>
            </Box>
    
            {/* Legal Links */}
            <Box
              sx={{
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              <Typography variant="body2">
                &copy; 2024 GoTo | All Rights Reserved
              </Typography>
              <Box sx={{ marginTop: "10px" }}>
                <Link href="#" style={{ color: "white", marginRight: "10px" }}>
                  Terms and Conditions
                </Link>
                <Link href="#" style={{ color: "white", marginRight: "10px" }}>
                  Privacy Policy
                </Link>
                <Link href="#" style={{ color: "white", marginRight: "10px" }}>
                  Cookie Preferences
                </Link>
                <Link href="#" style={{ color: "white", marginRight: "10px" }}>
                  Sitemap
                </Link>
              </Box>
            </Box>
          </Container>
        </footer>
      );
}