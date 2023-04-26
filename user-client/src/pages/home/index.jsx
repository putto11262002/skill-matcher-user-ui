import Head from 'next/head';
import { Box, Container, Typography, Button, Link } from '@mui/material';

const HomePage = () => {

  return (
    <>
      <Head>
        <title>Home Page | Skills Matcher</title>
        <meta name="description" content="Welcome to Skills Matcher" />
      </Head>
      <Box
        sx={{
          padding: '40px',
          backgroundColor: '#f5f5f5',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: '#333333',
            marginBottom: '20px',
            // Adjust font size for extra small (XS) screens and up
            fontSize: {
              xs: '40px',
              sm: '60px',
              md: '80px',
            },
          }}
        >
          Welcome to Skills Matcher
        </Typography>
        <Typography variant="h4"
          component="h2"
          sx={{
            color: '#666666',
            maxWidth: '800px',
            margin: '0 auto',
            // Adjust font size for extra small (XS) screens and up
            fontSize: {
              xs: '16px',
              sm: '20px',
              md: '24px',
            },
          }}>
          Discover new skills and connect with like-minded individuals on our cutting-edge app.
          Whether you&apos;re looking to learn a new skill or share your expertise with others,
          our platform provides the perfect one-stop solution. Join our community today and
          start unlocking your full potential!
        </Typography>
        <Link href="/profile-creation" underline="none">
          <Button variant="contained" color="primary" sx={{
            my: 4,
            background: `linear-gradient(to bottom right, #055fef, #58a6ff)`,
            padding: 4,
            borderRadius: 2,
            boxShadow: 4,
            textAlign: "center",
            width: { xs: '100%', sm: '75%', md: '100%' }, // adjust button width for different screen sizes
            height: { xs: '50px', sm: '60px', md: '70px' }, // adjust button height for different screen sizes
            '&:hover': {
              background: 'linear-gradient(45deg,#055fef, #58a6ff)',
              boxShadow: '0px 5px 15px rgba(255, 105, 135, .5)',
            },
          }}>
            Get started on your profile
          </Button>
        </Link>

        <Link href="/user/browse" underline="none">
          <Button variant="contained" color="primary" sx={{
            my: 4,
            background: `linear-gradient(to bottom right, #055fef, #58a6ff)`,
            padding: 4,
            borderRadius: 2,
            boxShadow: 4,
            textAlign: "center",
            width: { xs: '100%', sm: '75%', md: '100%' }, // adjust button width for different screen sizes
            height: { xs: '50px', sm: '60px', md: '70px' }, // adjust button height for different screen sizes
            '&:hover': {
              background: 'linear-gradient(45deg,#055fef, #58a6ff)',
              boxShadow: '0px 5px 15px rgba(255, 105, 135, .5)',
            },
          }}>
            Check out your feed
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default HomePage;
