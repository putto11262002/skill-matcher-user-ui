import React, { useEffect, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { USER_PAGE_SIZE } from "@/constants/user.constant";
import { Box, Button, Stack, Typography } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import matchService from "../../services/match.service";
import feedService, { FeedService } from "@/services/feed.service";
import { enqueueSnackbar } from "notistack";
import MatchGrid from "../../components/match/MatchGrid";
import SearchInput from "../../components/common/form/SearchInput";
import { MATCH_PAGE_SIZE, MATCH_STATUS } from "@/constants/match.constant";

const BrowseUserPage = () => {
  useAuth();

  const [query, setQuery] = useState({});
  const [page, setPage] = useState(0);
  const [feed, setFeed] = useState([]);
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
      feedService.search({
        ...query,
        pageSize: MATCH_PAGE_SIZE,
        q: searchTerm,
        match: MATCH_STATUS.ACTIVE,
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
          newFeed = [...feed, ...res?.data?.data];
        }

        setHasMore(newFeed.length < res?.data?.total);
        setFeed(newFeed);
      },
    }
  );

  const { mutate: matchUser } = useMutation(matchService.match, {
    onSuccess: (res) =>
      enqueueSnackbar("Match request has been sent", { variant: "success" }),
    onError: (err) => enqueueSnackbar(err.message, { variant: "error" }),
  });

  const handleMatch = (user) => {
    matchUser({ userId: user._id });
  };

  useEffect(() => {
    setUpdateSearchTerm(false);
    refetch();
  }, [page]);

  return (
    
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography> Match History </Typography>
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
        <MatchGrid
          hasMore={hasMore}
          onNext={() => setPage((prevPage) => prevPage + 1)}
          onMatch={handleMatch}
          users={feed}
          loading={isLoadingUsers}
          error={error}
        />
      </Stack>
    </Box>
  );
};

BrowseUserPage.requiredAuth = true;

export default BrowseUserPage;
