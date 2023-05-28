import { Box, Container, Toolbar } from "@mui/material";
import React from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar drawerWidth={240}/>
      <Box
        component="main"
        sx={{ width: "100vw", heigh: "auto", minHeight: "100vh" }}
      >
        <Toolbar />
        <Container  height="100%" sx={{ paddingY: 5 }} >
          {children}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
