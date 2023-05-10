"use client";
import React, { useCallback } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  Box,
  IconButton,
  Avatar,
  Grid,
  Tooltip,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { GridOnRounded } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import ReorderIcon from "@mui/icons-material/Reorder";
import { useRouter } from "next/router";
import { red } from "@mui/material/colors";
import { theme } from "@/styles/theme";
import authService from "@/services/auth.service";
import { signOut } from "@/redux/thunks/user.thunk";
import MenuIcon from "@mui/icons-material/Menu";
const drawerWidth = 240;
const navLinks = [
  {
    label: "Home",
    path: "/home",
    visibility: "both",
    icon: (props) => <HomeIcon {...props} />,
  },
  {
    label: "Suggestions",
    path: "/user/browse",
    visibility: "auth",
    icon: (props) => <ReorderIcon {...props} />,
  },
  // { label: "About Us", path: "/about-us", visibility: "both" },
  // { label: "Contact Us", path: "/contact-us", visibility: "both" },
  {
    label: "Search Users",
    path: "/user/search",
    visibility: "auth",
    icon: (props) => <SearchIcon {...props} />,
  },
  {
    label: "Matches",
    path: "/match",
    visibility: "auth",
    icon: (props) => <StarIcon {...props} />,
  },
  {
    label: "Requests Notifications",
    path: "/match/requests",
    visibility: "auth",
    icon: (props) =><NotificationsIcon {...props} />
    },
  // {
  //   label: "Dashboard",
  //   path: "/dashboard",
  //   visibility: "auth",
  //   icon: (props) => <PersonIcon {...props} />,
  // },
  {
    label: "My Profile",
    path: "/dashboard",
    visibility: "auth",
    icon: (props) => <PersonIcon {...props} />,
  },

];

const NavBar = ({ }) => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openMobileNav, setOpenMobileNav] = React.useState(false);

  const router = useRouter();



  const handleToggleMobileNav = () => {
    setOpenMobileNav(!openMobileNav);
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleEditProfile = () => {
    handleCloseUserMenu();
    router.push('/user/edit-profile')
  }

  const handleLogout = () => {
    dispatch(signOut({}));
    handleCloseUserMenu();
  };

  const renderNav = () => {
    return navLinks.map((link) => {
      let isHidden = true;
      if (link.visibility === "both") {
        isHidden = false;
      }

      if (link.visibility === "no-auth") {
        isHidden = isLoggedIn ? true : false;
      }

      if (link.visibility === "auth") {
        isHidden = isLoggedIn ? false : true;
      }

      if (isHidden) return;

      return (
        <Link
          suppressHydrationWarning
          key={link.path}
          href={link.path}
          passHref
        >
          <Tooltip title={link.label}>
            <IconButton>
              {link.icon({
                sx: {
                  color: (theme) =>
                    router.pathname === link.path
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                },
              })}
            </IconButton>
          </Tooltip>
        </Link>
      );
    });
  };

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
      >
        <Toolbar>
          {/* Mobile nav bar */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleToggleMobileNav} sx={{ width: "auto" }}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            variant="3"
            component="h3"
            textAlign="left"
            sx={{
              color: (theme) => theme.palette.primary.main,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            Skills Matcher
          </Typography>

          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, display: { xs: 'block', sm: 'none' }, }}
            aria-label="mailbox folders"
          >
            <Drawer
              container={container}
              variant="temporary"
              open={openMobileNav}
              onClose={handleToggleMobileNav}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{

                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, },
              }}
            >
              <Toolbar>
                <Typography variant="3" component="h3">Menu</Typography>
              </Toolbar>

              <List disablePadding>
                {navLinks.map(link => (

                  <ListItem sx={{ width: '100%', color: theme => router.pathname === link.path ? theme.palette.primary.main : theme.palette.text.secondary }} disablePadding key={link.path}>
                    <Link style={{ display: 'block' }} href={link.path}>
                      <ListItemButton sx={{ width: '100%' }} >
                        <ListItemIcon >
                          {link.icon({ sx: { color: theme => router.pathname === link.path ? theme.palette.primary.main : theme.palette.text.secondary } })}
                        </ListItemIcon>
                        <ListItemText primary={link.label} />
                      </ListItemButton>
                    </Link>
                  </ListItem>


                ))}
              </List>
            </Drawer>
          </Box>

          <Box sx={{ alignItems: "center", flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <Tooltip title={`Settings`}>
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar
                  sx={{ width: 30, height: 30 }}
                  src={user?.avatar?.url || "/images/no-avatar.jpg"}
                  sizes="s"
                />
              </IconButton>
            </Tooltip>
          </Box>
          {/* ---------------------------------------------------------- */}
          {/* Tablet and Desktop nav bar */}
          <Grid sx={{ display: { xs: "none", md: "flex" } }} container>
            <Grid
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              item
            >
              <Typography
                variant="3"
                component="h3"
                textAlign="left"
                sx={{ color: (theme) => theme.palette.primary.main }}
              >
                Skills Matcher
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-around",
                overflow: "hidden",
                alignItems: "center",
              }}
              xs={6}
              item
            >
              <Box sx={{ display: "flex", marginLeft: 3, gap: 4 }}>
                {" "}
                {renderNav()}
              </Box>
            </Grid>
            <Grid
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 2,
              }}
              item
            >
              {/* <Box sx={{ display: "flex", alignItems: "center", display: { xs: "none", md: "flex" } }}>
                <IconButton>
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Box> */}
              <Box sx={{ alignItems: "center", display: { xs: "none", md: "flex" } }}>
                <Tooltip title={`Settings`}>
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar
                      sx={{ width: 30, height: 30 }}
                      src={user?.avatar?.url || "/images/no-avatar.jpg"}
                      sizes="s"
                    />
                  </IconButton>
                </Tooltip>
              </Box>

            </Grid>
          </Grid>

          {/* Used in both mobile and desktop/tablet */}

          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleLogout}>
              <Typography textAlign="center">Log out</Typography>
            </MenuItem>
            <MenuItem onClick={handleEditProfile}>
              <Typography textAlign="center">Edit Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Change password</Typography>
            </MenuItem>
          </Menu>


        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default dynamic(() => Promise.resolve(NavBar), { ssr: false });
