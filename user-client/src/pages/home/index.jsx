import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Home Page | Skills Matcher</title>
        <meta name="description" content="Welcome to Skills Matcher" />
      </Head>
     
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" component="h2" align="center" gutterBottom>
            Welcome to Skills Matcher
          </Typography>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
          Discover new skills and connect with like-minded individuals on our cutting-edge app. 
          Whether you&apos;re looking to learn a new skill or share your expertise with others, 
          our platform provides the perfect one-stop solution. Join our community today and 
          start unlocking your full potential!
          </Typography>
        </Box>
    
    </>
  );
};

export default HomePage;
