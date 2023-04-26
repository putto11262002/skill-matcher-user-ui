import Head from 'next/head';
import { Box, Container, Typography, Button, Link } from '@mui/material';

const HomePage = () => {

  return (
    <>
      <Head>
        <title>Home Page | Skills Matcher</title>
        <meta name="description" content="Welcome to Skills Matcher" />
      </Head>
      <Box>
        <Typography variant="h2" component="h2" align="center" gutterBottom>
          Welcome to Skills Matcher
        </Typography>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
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
            '&:hover': {
              background: 'linear-gradient(45deg,#055fef, #58a6ff)',
              boxShadow: '0px 5px 15px rgba(255, 105, 135, .5)',
            },
          }}>
            Get started on your profile
          </Button>
          
        </Link>
      </Box>

    </>
  );
};

export default HomePage;
