
import { Box, Button, AppBar, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const userHomePage = () => {
  const router = useRouter();

  const handleNavigation = (route) => {
    router.push(route);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Button color="inherit" onClick={() => handleNavigation('/account')}>
            Account
          </Button>
          <Button color="inherit" onClick={() => handleNavigation('/matches')}>
            Matches
          </Button>
          <Button color="inherit" onClick={() => handleNavigation('/settings')}>
            Settings
          </Button>
        </Toolbar>
      </AppBar>
      <Box p={2}>
        <Typography variant="h4" component="h1" align="center">
          Welcome to My App!
        </Typography>
      </Box>
    </Box>
  );
};

export default userHomePage;
