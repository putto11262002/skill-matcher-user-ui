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
import { useQuery, useMutation, useInfiniteQuery } from "@tanstack/react-query";
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
import { MATCH_REQUEST_SUCCESS } from "@/constants/messages/match.message.constant";
const SearchUsers = () => {
  useAuth();

  const [query, setQuery] = useState(undefined);
  const { user } = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);

  const {
    isLoading: isLoadingUserSkills,
    error: userSkillError,
    data: userSkillRes,
  } = useQuery(
    ["user", user?._id, "skills"],
    () => userService.getSelfSkill(),
    { staleTime: 300000 }
  );

  const { mutate: matchUser } = useMutation(matchService.sendMatchRequest, {
    onSuccess: () =>
      enqueueSnackbar(MATCH_REQUEST_SUCCESS, { variant: "success" }),
    onError: (err) => enqueueSnackbar(err.message, { variant: "error" }),
  });

  const {
    fetchNextPage,
    data,
    isLoading: isLoadingUsers,
    error: errorFetchUsers,
    hasNextPage,
    refetch: refetchUsers,
    isInitialLoading,
  } = useInfiniteQuery(
    ["user", "search", query],
    async ({ pageParam = 0 }) => {
      const res = await userService.searchRankedUser({
        pageSize: USER_PAGE_SIZE,
        pageNumber: pageParam,
        ...query,
      });
      return res?.data?.data;
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage =
          lastPage.length === USER_PAGE_SIZE ? allPages.length : undefined;

        return nextPage;
      },
    }
  );

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
            refetchUsers({ refetchPage: (page, index) => index === 0 });
          }}
          skills={userSkillRes?.data?.data}
        />
        <Stack spacing={2}>
          <Typography>Search Result</Typography>
          <UserProfileGrid
            hasMore={hasNextPage}
            onMatch={handleMatch}
            error={errorFetchUsers}
            onNext={() => fetchNextPage()}
            users={data?.pages?.flat()}
            initialLoading={isInitialLoading}
          />
        </Stack>
      </Stack>
    </Box>
  );
};
export default SearchUsers;
