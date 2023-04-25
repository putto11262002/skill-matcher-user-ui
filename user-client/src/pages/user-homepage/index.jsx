import dynamic from 'next/dynamic';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Avatar, Button, Grid } from "@mui/material";
import { useMediaQuery } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import userService from '../../services/user.service';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function UserInfoTab() {
  const [value, setValue] = React.useState(0);
  const [user, setUser] = useState({});
  const { data: userSkills, isLoading: isLoadingSkills, error: errorLoadingSkills } = useQuery(
    ['user', user?._id, 'skills'],
    () => userService.getUserSkills(user?._id),
    { enabled: !!user?._id },
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', minWidth: '15em' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} variant='fullWidth' centered aria-label="basic tabs example">
          <Tab label="Learner" {...a11yProps(0)} />
          <Tab label="Tutor" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {isLoadingSkills ? (
          <div>Loading...</div>
        ) : errorLoadingSkills ? (
          <div>Error loading skills: {errorLoadingSkills.message}</div>
        ) : (
          userSkills?.data?.map((skill) => (
            <div key={skill._id}>
              <h3>{skill.name}</h3>
              <p>{skill.description}</p>
            </div>
          ))
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {isLoadingSkills ? (
          <div>Loading...</div>
        ) : errorLoadingSkills ? (
          <div>Error loading skills: {errorLoadingSkills.message}</div>
        ) : (
          userSkills?.data?.map((skill) => (
            <div key={skill._id}>
              <h3>{skill.name}</h3>
              <p>{skill.description}</p>
            </div>
          ))
        )}
      </TabPanel>
    </Box>
  );
}

const UserHomePage = () => {
  const [user, setUser] = useState({});
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');

  useEffect(() => {
    async function fetchUser() {
      const { data: user } = await userService.getSelf();
      setUser(user);
    }
    fetchUser();
  }, []);


  return (
    <Box sx={{ borderRadius: 4, p: 2, maxWidth: 1400 }}>
      <Typography variant='h5'>Profile</Typography>
      <Grid container spacing={isMobile ? 2 : 5} alignItems='center' sx={{ mt: 2, position: 'relative' }}>
        <Box display='flex' justifyContent='centre' sx={{ top: 5, left: 0, right: 0 }} >
          {user && (
            <Avatar
              src={user?.avatar?.url || '/images/no-avatar.jpg'}
              sx={{
                width: isMobile ? 100 : 130,
                height: isMobile ? 100 : 130,
                mr: isMobile ? 2 : 3,
                mb: isMobile ? 2 : 0,
              }}
            />
          )}
        </Box>
        <Grid justifyContent='centre' item xs={12} sm={4} md={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h6' component='h1' sx={{ mb: 1 }}>
              Welcome, {user?.profile?.firstName} {user?.profile?.lastName}!
            </Typography>
            <Typography sx={{ mb: 2 }}>Email: {user?.email}</Typography>
            <Typography sx={{ mb: 3 }}>Username: {user?.username}</Typography>
            <Typography sx={{ mb: 4 }}>Twitter: {user?.facebook}</Typography>
            <Typography sx={{ mb: 5 }}>Facebook: {user?.instagram}</Typography>
            <Typography sx={{ mb: 6 }}>Instagram: {user?.instagram}</Typography>
            <Box sx={{ border: 1, borderColor: 'grey.500', borderRadius: 3, p: 2 }}>
              <Box maxWidth='md'>
                <UserInfoTab />
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button variant='contained' onClick={() => router.push('/edit-details')}>
                Edit Profile
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

UserHomePage.requiredAuth = true

export default dynamic(() => Promise.resolve(UserHomePage), {
  ssr: false
})