import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '@/redux/thunks/user.thunk';

const TopBar = ({ handleDrawerToggle }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const [anchorElUser, setAnchorElUser] = useState(null);
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    dispatch(signOut({}))
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        // width: { sm: `calc(100%)` },
        // ml: { sm: `${drawerWidth}px` },
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: (theme) => theme.palette.background.paper,
      }}
    >
      <Toolbar sx={{ width: '100%' }}>
        <Box
          sx={{ width: '100%', display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'nowrap' }}
        >
          <Box sx={{ flexGrow: 0, display: { sm: 'none' } }}>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
            >
              <MenuIcon color='primary' />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant='h6'
              noWrap
              component='div'
              color={(theme) => theme.palette.primary.main}
            >
              Skill Matcher Admin
            </Typography>
          </Box>

          <Box>
            <IconButton onClick={handleOpenUserMenu} >
              <Avatar sx={{ width: 30, height: 30 }} sizes='s' src={user?.profile?.avatar} />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>

      <Menu
       sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
      >
      <MenuItem onClick={handleSignOut}>
        <Typography  textAlign='center'>Sign out</Typography>
      </MenuItem>

      </Menu>
    </AppBar>
  );
};

export default TopBar;
