import React from 'react';
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
        <Button sx={{ color: 'white' }}> Home  </Button>
        <Button sx={{ color: 'white' }}> About Us   </Button>
        <Button sx={{ color: 'white' }}> Contact us   </Button>
      </Toolbar>
    </AppBar>
  );
};


export default NavBar;
