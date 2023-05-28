import React from 'react'
import { Box, Container } from '@mui/material';
const AuthLayout  = (page) => {
    return (
      <Box
        component="main"
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="xs">{page}</Container>
      </Box>
    );
  };

export default AuthLayout