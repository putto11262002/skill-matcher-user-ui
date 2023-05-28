import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
const Error = ({ message}) => {
  return (
    <Stack spacing={2}>
      <Box sx={{display: 'flex', justifyContent: 'center'}}><ErrorIcon/></Box>
      <Typography textAlign='center' >
        {message || 'Something went wrong, please try again later!'}
      </Typography>
    </Stack>
  );
};

export default Error;
