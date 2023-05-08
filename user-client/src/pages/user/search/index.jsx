import useAuth from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  IconButton,
  Typography,
  FormControlLabel,
  Checkbox,
  Grid,
  InputBase,
  Stack,
} from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import SearchIcon from "@mui/icons-material/Search";
import UserProfileCard from "@/components/user/UserProfileGrid";
import userService from "@/services/user.service";
import { useSelector } from "react-redux";
import styled from "styled-components";
import SearchSection from "@/components/user/SearchSection";
import feedService from "@/services/feed.service";
import UserProfileGrid from "@/components/user/UserProfileGrid";
import matchService from "@/services/match.service";


const SearchUsers = () => {
  useAuth();

  const [query, setQuery] = useState({matched: false})
  const {user} = useSelector(state => state.auth)

  const {
    data: userSkillRes,
    isLoading: isLoadingUserSkills,
    error: userSkillError,
  } = useQuery(['user', user?._id, 'skills'] ,() => userService.getSelfSkill(), {staleTime: 300000});


    const { mutate: matchUser } = useMutation(matchService.match, {
    onSuccess: (res) => console.log(res),
  });
  const {data: feedRes, isLoading: loadingFeed, refetch: handleSearchFeed, error: searchFeedError} = useQuery(['feed', 'search'], () => feedService.search(query), {enabled: false})

  useEffect(() => {
    handleSearchFeed()
  }, [query])

    const handleMatch = (user) => {
    matchUser({ userId: user._id });
  };

  return (
    <Box
    sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
  >
    <Stack spacing={4} maxWidth={600} sx={{width: '100%'}}>
      {/* <Typography
        variant="2"
        textAlign="center"
        component="h2"
        color={(theme) => theme.palette.primary.main}
      >
        Search for skills and users
      </Typography> */}

      {/* Search bar and button */}
      {/* <Box sx={{ width: "100%", justifyContent: "center", marginTop: "20px" }}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TextField
            fullWidth
            id="search-field"
            // label="Start typing to search.."
            placeholder="Search by name, username"
            value={searchText}
            sx={{border: 'none'}}
            onChange={handleTextChange}
            in
          />
          <InputBase/>
          <IconButton
            type="submit"
            aria-label="search"
            onClick={handleSearch}
            sx={{
              backgroundColor: "#055fef",
              color: "#ffffff",
              padding: "16px",
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "25",
            }}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box> */}
      {/* Learner/Tutor filter box  */}
      {/* <Box
        sx={{
          boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.1)",
          borderRadius: "5px",
          p: 1,
          mt: 2,
        }}
      >
        <Typography variant="subtitle1" marginTop={1}>
          Check all that applies:
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
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
      </Box> */}
      {/* Filtering Skills */}
      {/* <Box
        sx={{
          boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.1)",
          borderRadius: "5px",
          p: 1,
          mt: 2,
        }}
      >
        <Typography variant="subtitle1" marginTop={1}>
          Skills:
        </Typography>
        {!(isLoadingUserSkills && Boolean(userSkillError)) && userSkillRes?.data?.data.map((skill) => (
          <FormControlLabel
            key={skill.skill}
            control={<Checkbox name={skill.skill} />}
            label={skill.skill}
            onChange={(event) => {
              if (event.target.checked) {
                setSelectedSkills([...selectedSkills, event.target.name]);
              } else {
                setSelectedSkills(
                  selectedSkills.filter((skill) => skill !== event.target.name)
                );
              }
            }}
          />
        ))}
      </Box> */}

      {/* <Button
        variant="contained"
        onClick={handleSearch}
        sx={{
          backgroundColor: "#055fef",
          color: "#ffffff",
          padding: "12px 24px",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Search
      </Button> */}

      {/* Logic for showing user profile  */}
      {/* 
      {users && users.map((user) => (
        <UserProfileCard user={user} key={user._id} />
      ))}
      */}

      <SearchSection loading={isLoadingUserSkills} onSubmit={(query) => {
        setQuery(query)
      }} skills={userSkillRes?.data?.data}/>
    <Stack spacing={2}>
    <Typography>Search Result</Typography>
    <UserProfileGrid onMatch={handleMatch} error={searchFeedError} loading={loadingFeed} users={feedRes?.data?.data || []}/>
    </Stack>

</Stack>
    </Box>
  );
};
export default SearchUsers;
