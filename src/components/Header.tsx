"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { fetchUserLoginStatus } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import { ProfileMenu } from "./profile/ProfileMenu";

export default function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const { loggedIn, user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchUserLoginStatus());
  }, [dispatch]);

  // State for dropdown menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const navigationLinks = [
    { label: "About Us", href: "/about-us" },
    { label: "Support", href: "/support" },
    { label: "Download", href: "/download" },
  ];

  const featureLinks = [
    { label: "Meeting", href: "/features/meeting" },
    { label: "Chat Room", href: "/features/chat-room" },
    { label: "Phone", href: "/features/phone" },
    { label: "Task Management", href: "/features/task-management" },
  ];

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          <Link href={"/"} className="flex gap-2 items-center">
            <Logo />
            Keetlo Meeting
          </Link>
        </Typography>

        <div className="hidden lg:block">
          <Box className="flex gap-4 items-center">
            {navigationLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>
            ))}
            <Box>
              {/* Features Dropdown */}
              <Button
                onClick={handleMenuOpen}
                endIcon={<ArrowDropDownIcon />}
                sx={{ textTransform: "none", color: "black", padding: "0px" }}
              >
                Features
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                  "aria-labelledby": "features-button",
                }}
              >
                {featureLinks.map((link) => (
                  <MenuItem key={link.label} onClick={handleMenuClose}>
                    <Link href={link.href}>{link.label}</Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Link href={"/join"}>
              <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg">
                Join a Meeting
              </button>
            </Link>
          </Box>
        </div>

        <div className="lg:hidden flex">
            <div className="me-2">
            <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                <List>
                  {navigationLinks.map((link) => (
                    <ListItem key={link.label} component="a" href={link.href}>
                      <ListItemText primary={link.label} />
                    </ListItem>
                  ))}
                  <ListItem>
                    <ListItemText primary="Features" />
                  </ListItem>
                  {featureLinks.map((link) => (
                    <ListItem key={link.label} component="a" href={link.href} sx={{ pl: 4 }}>
                      <ListItemText primary={link.label} />
                    </ListItem>
                  ))}
                  <ListItem component="a" href="/join">
                    <ListItemText primary="Join a Meeting" />
                  </ListItem>
                </List>
              </Box>
            </Drawer>
            </div>
            <Link href={"/join"}>
              <button className="me-2 bg-red-500 hover:bg-red-700 px-6 py-2 rounded-md text-white">
                Join
              </button>
            </Link>
          </div>


        {!loading && (
          loggedIn ? (
            <Box className="lg:ms-2">
              <ProfileMenu user={user} />
            </Box>
          ) : (
            <button
            className="lg:ms-2 hover:text-red-500" 
            onClick={() => router.push("/sign-in")}
            >
              Sign In
            </button>
          )
        )}
      </Toolbar>
    </AppBar>
  );
}
