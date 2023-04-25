"use client";
import React, { useCallback } from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import dynamic from "next/dynamic";

const navLinks = [
  { label: "Home", path: "/home", visibility: "both" },
  { label: "About Us", path: "/about-us", visibility: "both" },
  { label: "Contact Us", path: "/contact-us", visibility: "both" },
  { label: "Profile", path: "/user-homepage", visibility: "auth" },
  { label: "Logout", path: "/logout", visibility: "auth" },
  { label: "Sign In", path: "/login", visibility: "no-auth" },
  { label: "Sign Up", path: "/sign-up", visibility: "no-auth" },
];

const NavBar = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  
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
          {" "}
          <Button
            sx={{
              color: "white",
              textDecoration: "none",
            }}
          >
            {link.label}{" "}
          </Button>{" "}
        </Link>
      );
    });
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          textAlign="left"
          sx={{ flexGrow: 1, color: "white" }}
        >
          Skills Matcher
        </Typography>
        {renderNav()}
      </Toolbar>
    </AppBar>
  );
};

export default dynamic(() => Promise.resolve(NavBar), { ssr: false });
