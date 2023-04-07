import React from 'react';
import SideNav from './SideNav';
import TopBar from './TopBar';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container, useTheme } from '@mui/material';
const drawerWidth = 240;
const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <TopBar handleDrawerToggle={handleDrawerToggle} />
        <SideNav mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <Box
          component='main'
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)`, xs: '100%' },
            display: 'grid',
            height: '100vh',
            gridTemplateRows: 'min-content auto',
          }}
        >
          <Toolbar />
          <Container height='100%' sx={{ paddingY: 5 }} maxWidth='md'>
            {children}
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
