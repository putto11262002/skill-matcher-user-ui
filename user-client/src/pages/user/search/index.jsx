import useAuth from '@/hooks/useAuth';
import React, { useState } from 'react';
import {
  Box, TextField, Button, Paper, IconButton,
  Typography, FormControlLabel, Checkbox, Grid
} from '@mui/material';
import { useQuery } from "@tanstack/react-query";
import SearchIcon from '@mui/icons-material/Search';
import UserProfileCard from "@/components/user/UserProfileGrid";
import userService from "@/services/user.service";

const SearchUsers = () => {
  useAuth()
  const [searchText, setSearchText] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

  const availableSkills = ['JavaScript', 'React', 'Node.js', 'Python', 'Django', 'Java', 'Spring Boot'];

  const handleSearch = () => {
    // Handle search logic here
    console.log(`Searching for: ${searchText}`);
  };

  const handleTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleCheckedChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Box sx={{ width: '100%', justifyContent: 'center' }}>
      <Typography
        variant="2"
        textAlign="center"
        component="h2"
        color={(theme) => theme.palette.primary.main}
      >
        Search for skills and users
      </Typography>

      {/* Search bar and button */}
      <Box sx={{ width: '100%', justifyContent: 'center', marginTop: '20px' }}>
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
          <TextField fullWidth id="search-field" label="Start typing to search.." value={searchText} onChange={handleTextChange} />
          <IconButton type="submit" aria-label="search" onClick={handleSearch}
            sx={{
              backgroundColor: '#055fef', color: '#ffffff',
              padding: '16px', fontSize: '16px', border: 'none',
              borderRadius: '5px', cursor: 'pointer', width: '25'
            }}>
            <SearchIcon />
          </IconButton>
        </Paper >
      </Box>
      {/* Learner/Tutor filter box  */}
      <Box sx={{
        boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
        p: 1,
        mt: 2,
      }}>
        <Typography variant="subtitle1" marginTop={1}>Check all that applies:</Typography>
        <Grid container spacing={1}>
          <Grid item xs={6} >
            <FormControlLabel
              control={<Checkbox name="learner" />}
              label="Learn"
              onChange={handleCheckedChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox name="teach" />}
              label="Teach"
              onChange={handleCheckedChange}
            />
          </Grid>
        </Grid>
      </Box>
      {/* Filtering Skills */}
      <Box sx={{
        boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
        p: 1,
        mt: 2,
      }}>
        <Typography variant="subtitle1" marginTop={1}>Skills:</Typography>
        {availableSkills.map(skill => (
          <FormControlLabel
            key={skill}
            control={<Checkbox name={skill} />}
            label={skill}
            onChange={(event) => {
              if (event.target.checked) {
                setSelectedSkills([...selectedSkills, event.target.name]);
              } else {
                setSelectedSkills(selectedSkills.filter(skill => skill !== event.target.name));
              }
            }}
          />
        ))}
      </Box>

      <Button variant="contained" onClick={handleSearch} sx={{
        backgroundColor: '#055fef',
        color: '#ffffff',
        padding: '12px 24px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
      }}>
        Search
      </Button>

      {/* Logic for showing user profile  */}
      {/* 
      {users && users.map((user) => (
        <UserProfileCard user={user} key={user._id} />
      ))}
      */}
    </Box >
  );
};
export default SearchUsers;