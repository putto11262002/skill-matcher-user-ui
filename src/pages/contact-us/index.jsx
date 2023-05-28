import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Home Page | Skills Matcher</title>
        <meta name="description" content="Welcome to Skills Matcher" />
      </Head>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h1" component="h1" align="center" gutterBottom>
            Welcome to Skills Matcher
          </Typography>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Your one-stop solution 
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
