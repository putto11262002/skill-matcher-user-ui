import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Divider,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
const LandingPage = () => {
  return (
    <Slide
      style={{ transitionDuration: 2000 }}
      in={true}
      direction="down"
      mountOnEnter
      unmountOnExit
    >
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        maxWidth="md"
      >
        <Typography variant="2" component="h2" align="center" gutterBottom>
          Welcome to Skills Matcher
        </Typography>
        <Typography variant="body1" component="p" align="center" gutterBottom>
          Discover new skills and connect with like-minded individuals on our
          cutting-edge app. Whether you&apos;re looking to learn a new skill or
          share your expertise with others, our platform provides the perfect
          one-stop solution. Join our community today and start unlocking your
          full potential!
        </Typography>
        <Stack marginTop={3} spacing={3} direction="row">
          <Link style={{ whiteSpace: "nowrap" }} href="/sign-up">
            <Typography
              whiteSpace="nowrap"
              color={(theme) => theme.palette.primary.light}
            >
              Sign up
            </Typography>
          </Link>{" "}
          <Divider orientation="vertical" />{" "}
          <Link style={{ whiteSpace: "nowrap" }} href="/login">
            <Typography
              color={(theme) => theme.palette.primary.light}
              whiteSpace="nowrap"
            >
              Sign in
            </Typography>
          </Link>{" "}
        </Stack>
      </Container>
    </Slide>
  );
};

LandingPage.getLayout = (page) => {
  return <>{page}</>;
};

export default LandingPage;
