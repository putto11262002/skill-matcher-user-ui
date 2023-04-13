import React from 'react';
import Link from 'next/link';
import { 
  AppBar,
  Toolbar,
  Typography,
  Button 
} from '@mui/material';

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
      <Toolbar>
        <Typography variant="h6" component="div"  textAlign='left' sx={{ flexGrow: 1, color: 'white' }}>
          Skills Matcher 
        </Typography>
        <Link href="/home" passHref>
        <Button sx={{ color: 'white', textDecoration: 'none' }}> Home  </Button>
        </Link>
        <Link href="/about-us" passHref>
          <Button sx={{ color: 'white', textDecoration: 'none' }}> About Us </Button>
        </Link>
        <Link href="/contact-us" passHref>
        <Button sx={{ color: 'white', textDecoration: 'none' }}> Contact us   </Button>
        </Link>
        
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

