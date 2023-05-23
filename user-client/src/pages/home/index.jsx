import Head from 'next/head';
import { Box, Container, Typography, Button, Link, Grid } from '@mui/material';
import useAuth from '@/hooks/useAuth';
import ConstructionIcon from '@mui/icons-material/Construction';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ForumIcon from '@mui/icons-material/Forum';

const HomePage = () => {
  useAuth()

  return (
    <>
      <Head>
        <title>Home Page | Skills Matcher</title>
        <meta name="description" content="Welcome to Skills Matcher" />
      </Head>
      <Box
        sx={{
          padding: '40px',
          backgroundColor: '#e1f5fe',
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

        <Box marginTop={5} /> {/* Adds vertical space */}
        <Grid container spacing={2}>
        <Grid item xs={8} md={3}>
            <Container className="container">
              <Box className="iconContainer">
                <ConstructionIcon style={{ fontSize: 150, color: 'orange' }} />
              </Box>
              <Typography variant="h4" align="center">
                Skills
              </Typography>
              <Box marginTop={2} /> {/* Adds vertical space */}
              <Typography variant="subtitle1" align="center" style={{ fontStyle: 'italic' }}>
             Add skills to your profile showcase your unique expertise and stand out from the crowd! 
              </Typography>
              <Box marginTop={2} /> {/* Adds vertical space */}
            <Link href="/user/edit-profile" underline="none">
                            <Button variant="outlined">Add Skills </Button>
                        </Link>
            </Container>
          </Grid>
        
          <Grid item xs={8} md={3}>
          <Container className="container">
            <Box className="iconContainer">
              <PeopleAltIcon style={{ fontSize: 150, color: 'orange' }} />
            </Box>
            <Typography variant="h4" align="center">
              Search
            </Typography>
            <Box marginTop={2} /> {/* Adds vertical space */}
            <Typography variant="subtitle1" align="center" style={{ fontStyle: 'italic' }}>
            Find like-minded individuals to share and expand your knowledge with!
            </Typography>
            <Box marginTop={2} /> {/* Adds vertical space */}
            <Link href="/user/search" underline="none">
                            <Button variant="outlined">Search </Button>
                        </Link>
          </Container>
        </Grid>

        <Grid item xs={8} md={3}>
          <Container className="container">
            <Box className="iconContainer">
              <AddCircleOutlineIcon style={{ fontSize: 150, color: 'orange' }} />
            </Box>
            <Typography variant="h4" align="center">
              Match
            </Typography>
            <Box marginTop={2} /> {/* Adds vertical space */}
            <Typography variant="subtitle1" align="center" style={{ fontStyle: 'italic' }}>
            Match with with like-minded individuals who are eager to learn and grow!
            </Typography>
            <Box marginTop={2} /> {/* Adds vertical space */}
            <Link href="/user/suggestion" underline="none">
                            <Button variant="outlined">Suggestions </Button>
                        </Link>
          </Container>
        </Grid>

        <Grid item xs={8} md={3}>
          <Container className="container">
            <Box className="iconContainer">
              <ForumIcon style={{ fontSize: 150, color: 'orange' }} />
            </Box>
            <Typography variant="h4" align="center">
              Communicate
            </Typography>
            <Box marginTop={2} /> {/* Adds vertical space */}
            <Typography variant="subtitle1" align="center" style={{ fontStyle: 'italic' }}>
            Connect with your passionate and knowledgeable matches and share your expertise!
            </Typography>
            <Box marginTop={2} /> {/* Adds vertical space */}
            <Link href="/match" underline="none">
                            <Button variant="outlined">Matches </Button>
                        </Link>
          </Container>
        </Grid>
        </Grid>
{/* 



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
        </Link> */}
      </Box>
    </>
  );
};

export default HomePage;
