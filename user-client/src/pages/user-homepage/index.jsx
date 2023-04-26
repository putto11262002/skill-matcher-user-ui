import dynamic from 'next/dynamic';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Avatar, Button, Grid, TextField } from "@mui/material";
import { useMediaQuery } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import userService from '../../services/user.service';
import useAuth from '@/hooks/useAuth';

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
  useAuth()
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
          <Tab label="Learning" {...a11yProps(0)} />
          <Tab label="Tutoring" {...a11yProps(1)} />
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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [snapchat, setSnapchat] = useState('');
  const [facebook, setFacebook] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');

  useEffect(() => {
    async function fetchUser() {
      const { data: user } = await userService.getSelf();
      setUser(user);
      setFirstName(user?.profile?.firstName || '');
      setLastName(user?.profile?.lastName || '');
      setAboutMe(user?.aboutMe || '');
      setPhoneNumber(user?.phoneNumber || '');
      setEmail(user?.email || '');
      setInstagram(user?.instagram || '');
      setSnapchat(user?.snapchat || '');
      setFacebook(user?.facebook || '');
      setWhatsapp(user?.whatsapp || '');
    }
    fetchUser();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      profile: {
        firstName,
        lastName,
      },
      aboutMe,
      phoneNumber,
      email,
      instagram,
      snapchat,
      facebook,
      whatsapp,
    };
    await userService.updateSelf(payload);
    router.push('/profile');
  }


  return (
    <Box alignItems={'center'} >
      <Grid container spacing={isMobile ? 2 : 5} alignItems='center' sx={{ mt: 5, position: 'relative' }} justifyContent="center">
        <Grid justifyContent='centre' item xs={12} sm={4} md={8}>
          <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h6' component='h1' sx={{ mb: 1, fontWeight: 'bold' }}>
              < Box display='flex' justifyContent='center' alignItems='center' sx={{ top: 0, mb: { xs: 2, sm: 0 } }}>
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
              Welcome, {user?.profile?.firstName} {user?.profile?.lastName} to your user profile!
            </Typography>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
              sx={{ mb: 2 }}
            />
            <TextField
              label='About Me'
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              error={!!errors.aboutMe}
              helperText={errors.aboutMe}
              sx={{ mb: 2 }}
            />
            <TextField
              label='Phone Number'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              sx={{ mb: 2 }}
            />
            <TextField
              label='Instagram'
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              error={!!errors.instagram}
              helperText={errors.instagram}
              sx={{ mb: 2 }}
            />
            <TextField
              label='Snapchat'
              value={snapchat}
              onChange={(e) => setSnapchat(e.target.value)}
              error={!!errors.snapchat}
              helperText={errors.snapchat}
              sx={{ mb: 2 }}
            />
            <TextField
              label='Facebook'
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              error={!!errors.facebook}
              helperText={errors.facebook}
              sx={{ mb: 2 }}
            />
            <TextField
              label='WhatsApp'
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              error={!!errors.whatsapp}
              helperText={errors.whatsapp}
              sx={{ mb: 3 }}
            />
            <Box sx={{ border: 1, borderColor: 'grey.500', borderRadius: 3, p: 2 }}>
              <Box maxWidth='md'>
                <Typography> Your Skills </Typography>
                <UserInfoTab />
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button type='submit' variant='contained'>
                Save Changes
              </Button>
              <Button variant='contained' onClick={() => router.push('/edit-details')}>
                Edit Profile
              </Button>
            </Box>

          </Box>
        </Grid>
      </Grid>
    </Box >
  );
};

UserHomePage.requiredAuth = true

export default dynamic(() => Promise.resolve(UserHomePage), {
  ssr: false
})