import React from 'react';
import {
  Typography,
  Box,
  Avatar,
  Tabs,
  Tab
} from '@mui/material';
import { useSelector } from 'react-redux';


const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box>
        <Avatar
          src="/images/1.png"
          sx={{ width: 100, height: 100 }}
        />
        {/*
      <Typography variant="h6">Name: {user.firstName} {user.lastName}</Typography>
      <Typography variant="h6">Email: {user.email}</Typography>
      <Typography variant="h6">Username: {user.username}</Typography>
      */}
      </Box>
      <Box sx={{ width: '100%', marginTop: '2rem' }}>
      <Typography variant="h5">User Profile</Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="primary tabs example"
          >
            <Tab value="one" label="Learning" />
            <Tab value="two" label="Tutoring" />
          </Tabs>
        </Box>
    </Box>
  );
};

export default UserProfile;