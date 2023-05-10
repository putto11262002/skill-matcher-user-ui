import React, { useEffect, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { USER_PAGE_SIZE } from "@/constants/user.constant";
import { Box, Button, Stack, Typography } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import matchService from "@/services/match.service";
import feedService, { FeedService } from "@/services/feed.service";
import { enqueueSnackbar } from "notistack";
import MatchCardRequest from "@/components/match/MatchRequestCard";
import SearchInput from "@/components/common/form/SearchInput";
import { MATCH_PAGE_SIZE, MATCH_STATUS } from "@/constants/match.constant";
import MatchGridRequest from "@/components/match/MatchGridRequest";
import userService from "../../../services/user.service";

const RequestsPage = () => {
  useAuth();

  const [query, setQuery] = useState({});
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatedSearchTerm, setUpdateSearchTerm] = useState(true);

  const {
    isLoading: isLoadingUsers,
    error,
    refetch,
  } = useQuery(
    ["feed", "matched", page, query],
    () =>
      userService.getRequestedUsers({
        ...query,
        pageSize: MATCH_PAGE_SIZE,
        q: searchTerm,
        match: MATCH_STATUS.PENDING,
        pageNumber: page,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (res) => {
        let newFeed = [];
        if (updatedSearchTerm) {
          newFeed = res?.data?.data;
        } else {
          newFeed = [...users, ...res?.data?.data];
        }

        setHasMore(newFeed.length < res?.data?.total);
        setUsers(newFeed);
      },
    }
  );


  const { mutate: declineRequest } = useMutation(matchService.declineRequest, {
    onSuccess: (res, {userId}) =>
      {enqueueSnackbar("Match request has been declined", { variant: "success" })
      setUsers(prevUsers => prevUsers.filter(u => u._id !== userId))
    },
    onError: (err) => enqueueSnackbar(err.message, { variant: "error" }),
  });

  const { mutate: acceptRequest } = useMutation(matchService.acceptMatchRequest, {
    onSuccess: (res, {userId}) =>{
      enqueueSnackbar("Match request has been accepted", { variant: "success" })
      setUsers(prevUsers => prevUsers.filter(u => u._id !== userId))
    },
    onError: (err) => enqueueSnackbar(err.message, { variant: "error" }),
  });


  useEffect(() => {
    setUpdateSearchTerm(false);
    refetch();
  }, [page]);

  const handleDecline = (user) => {
    declineRequest({userId: user._id});
    // setFeed(prevFeed => prevFeed.filter(u => u._id !== user._id))
  }

  const handleAccept = (user) =>{
    console.log(user)
    acceptRequest({userId: user._id});
    
  }


  console.log(users)
  return (
    
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography> Match Requests </Typography>
      <Stack spacing={3} maxWidth={600} sx={{ width: "100%" }}>
        <Box
          onSubmit={(e) => {
            e.preventDefault();
            setPage(0);
            setUpdateSearchTerm(true);
            refetch();
          }}
          component="form"
        >
          <SearchInput onChange={(searchTerm) => setSearchTerm(searchTerm)} />
        </Box>
        <MatchGridRequest
          hasMore={hasMore}
          onNext={() => setPage((prevPage) => prevPage + 1)}
          onDecline={handleDecline}
          onAccept ={handleAccept}
          users={users}
          loading={isLoadingUsers}
          error={error}

        />
      </Stack>
    </Box>
  );
};

RequestsPage.requiredAuth = true;

export default RequestsPage;
