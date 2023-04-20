import React from 'react';
import {
  Typography,
  Box,
  Avatar,
  Tabs,
  Tab,
  Container,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';


function TabPanel(props) {
  const { user } = useSelector((state) => state.auth);
  const { children, value, index, handleChange, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const { user } = useSelector((state) => state.auth);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar src="/images/1.png" sx={{ width: 130, height: 130, mt: 4 }} />
      {/*<Typography variant="h6" mt={2}>Name: {user.firstName}</Typography>
      <Typography variant="h6">Email: {user.email}</Typography>
      <Typography variant="h6">Username: {user.username}</Typography>*/}
      <Container sx={{ width: '100%', mt: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
            <Tab label="Learning" {...a11yProps(0)} />
            <Tab label="Tutoring" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0} handleChange={handleChange}>
            Learning Content - fetch user's skill data
          </TabPanel>
          <TabPanel value={value} index={1} handleChange={handleChange}>
            Tutoring Content  - fetch user's tutor data
          </TabPanel>
        </Box>
      </Container >
    </Box >
  );
}