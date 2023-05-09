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
import { USER_PAGE_SIZE } from "@/constants/user.constant";
import { enqueueSnackbar } from "notistack";
import { MATCH_STATUS } from "@/constants/match.constant";
const SearchUsers = () => {
  useAuth();

  const [query, setQuery] = useState(undefined);
  const { user } = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const [updatedQuery, setUpdateQuery] = useState(false);
  const [searchedFeed, setSearchedFeed] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const {
    isLoading: isLoadingUserSkills,
    error: userSkillError,
    data: userSkillRes,
  } = useQuery(
    ["user", user?._id, "skills"],
    () => userService.getSelfSkill(),
    { staleTime: 300000 }
  );

  const { mutate: matchUser } = useMutation(matchService.match, {
    onSuccess: (res) =>
      enqueueSnackbar("Match request has been sent", { variant: "success" }),
    onError: (err) => enqueueSnackbar(err.message, { variant: "error" }),
  });

  const {
    isLoading: loadingFeed,
    refetch: handleSearchFeed,
    error: searchFeedError,
  } = useQuery(
    ["feed", "search"],
    () =>
      feedService.search({
        ...query,
        pageSize: USER_PAGE_SIZE,
        pageNumber: page,
        match: MATCH_STATUS.NOT_MATCHED
      }),
    {
      enabled: false,
      onSuccess: (res) => {
        let newFeed = [];
        if (updatedQuery) {
          newFeed = res?.data?.data;
        } else {
          newFeed = [...searchedFeed, ...res?.data?.data];
        }
        setHasMore(newFeed.length < res?.data?.total);
        setSearchedFeed(newFeed);
      },
    }
  );

  useEffect(() => {
    // if (!query) return;
    setUpdateQuery(true);
    setPage(0);
    handleSearchFeed();
  }, [query]);

  useEffect(() => {
    if (!query) return;
    handleSearchFeed();
  }, [page]);

  const handleMatch = (user) => {
    matchUser({ userId: user._id });
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Stack spacing={4} maxWidth={600} sx={{ width: "100%" }}>
        <SearchSection
          loading={isLoadingUserSkills}
          onSubmit={(query) => {
            setQuery(query);
          }}
          skills={userSkillRes?.data?.data}
        />
        <Stack spacing={2}>
          <Typography>Search Result</Typography>
          <UserProfileGrid
            hasMore={hasMore}
            onMatch={handleMatch}
            error={searchFeedError}
            onNext={() => {
              setUpdateQuery(false);
              setPage((prevPage) => prevPage + 1);
            }}
            users={searchedFeed || []}
          />
        </Stack>
      </Stack>
    </Box>
  );
};
export default SearchUsers;
