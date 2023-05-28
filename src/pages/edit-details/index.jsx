import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Box,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import userService from '@/services/user.service';

/* update user schema 
"username": "string",
"status": "string",
"profile": {
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "contactEmail": "string",
  "instagram": "string",
  "snapchat": "string",
  "facebook": "string",
  "whatsapp": "string",
  "aboutMe": "string"
  */
const EditDetailsPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const { isLoggedIn } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      userService.getSelf().then((response) => {
        const user = response.data;
        setFirstName(user.profile.firstName);
        setLastName(user.profile.lastName);
        setEmail(user.email);
      }).catch((error) => {
        console.log('Error fetching user data', error);
      });
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});

    userService.updateUser({ firstName, lastName, email }).then(() => {
      router.push('/profile');
    }).catch((error) => {
      console.log('Error updating user data', error);
      setErrors(error.response.data);
    });
  };

  return (
    <>
      <Head>
        <title>Edit Profile</title>
      </Head>

      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          id="firstName"
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />

        <TextField
          fullWidth
          margin="normal"
          id="lastName"
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />

        <TextField
          fullWidth
          margin="normal"
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />

        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </Box>
    </>
  );
};

export default EditDetailsPage;
