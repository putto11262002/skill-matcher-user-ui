import React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const TopBar = ({ handleDrawerToggle }) => {
  return (
    <AppBar
      position='fixed'
      sx={{
        // width: { sm: `calc(100%)` },
        // ml: { sm: `${drawerWidth}px` },
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: theme => theme.palette.background.paper
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' noWrap component='div' color={theme => theme.palette.primary.main}>
          Skill Matcher Admin
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
