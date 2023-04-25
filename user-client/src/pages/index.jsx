
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Head from 'next/head'
import dynamic from 'next/dynamic';
import userService from '@/services/user.service';
import {
  Typography,
  Link,
  Button,
} from '@mui/material';


const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.auth);

  // Use useQuery to fetch the user data
  const { isLoading, data: user } = useQuery('userData', userService.getSelf, {
    enabled: isLoggedIn, // Only fetch the data when the user is logged in
  });

  // Use useMutation to update the user data
  const [updateUser] = useMutation(userService.updateSelf);

  useEffect(() => {
    if (isLoggedIn) router.push('/home');
    else router.push('/landing')
    
  }, []);


  useEffect(() => {
    if (isLoggedIn) {
      userService.getSelf().then((userData) => {
        setUser(userData.data); // Note the use of userData.data to get the user data from the response object
      }).catch((error) => {
        console.log('Error fetching user data', error);
      });
    }
  }, [isLoggedIn]);


  return (
    <>
      <Head>
        <title>Skill matcher</title>
      </Head>

      {/* Use Button instead of Link for conditional rendering */}

      <Typography variant='1' component='h1'>H1</Typography>
      {isLoggedIn && (
        <Typography variant='h6' component='h6'>
          Welcome, {user.firstName} {user.lastName}!
        </Typography>
      )}
    </>
  );
}

// Use dynamic export for page what does not require server side rendering (when using const)

export default dynamic(() => Promise.resolve(Home), {
  ssr: false
})
