import React from 'react'
import { 
  AppBar,
  Toolbar,
  Typography,
  Button 
} from '@mui/material';

const Footer = () => {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Footer - insert more 
          </Typography>
        </Toolbar>
      </AppBar>
    );
}

export default Footer