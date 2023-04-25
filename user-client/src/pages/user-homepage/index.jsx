import dynamic from 'next/dynamic';
import Image from 'next/image';
import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import { Avatar } from "@mui/material"
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

  useEffect(() => {
    async function fetchUser() {
      const { data: user } = await userService.getSelf();
      setUser(user);
    }
    fetchUser();
  }, []);


  return <Stack alignItems='center' sx={{ width: '100%' }}>
    {user && (
  <Avatar
    src={user?.avatar?.url || "/images/no-avatar.jpg"}
    sx={{ width: 130, height: 130, mt: 4 }}
  />
)}
    <Box maxWidth='md'><UserInfoTab /></Box>
  </Stack>
}

UserHomePage.requiredAuth = true

export default dynamic(() => Promise.resolve(UserHomePage), {
  ssr: false
})