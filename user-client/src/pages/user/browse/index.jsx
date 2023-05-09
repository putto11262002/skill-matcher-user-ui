import React, { useEffect, useState } from "react";

import UserProfileGrid from "@/components/user/UserProfileGrid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { USER_PAGE_SIZE } from "@/constants/user.constant";
import { Box } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import matchService from "../../../services/match.service";
import feedService, { FeedService } from "@/services/feed.service";
import { enqueueSnackbar } from "notistack";

const BrowseUserPage = () => {
  useAuth();

  const [query, setQuery] = useState({});
  const [page, setPage] = useState(0);
  const [feed, setFeed] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const {
    isLoading: isLoadingUsers,

    error,
    refetch,
  } = useQuery(
    ["feed", "suggestion", page, query],
    () =>
      feedService.get({
        ...query,
        pageSize: USER_PAGE_SIZE,
        pageNumber: page,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (res) => {
        const newFeed = [...feed, ...res?.data?.data];
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
    refetch();
  }, [page]);
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box maxWidth={600} sx={{ width: "100%" }}>
        {/* <SkillSlider  skills={['computer science', 'java', 'python', 'machine learning', 'amazon web services', 'google cloud', 'go', 'rust']}/> */}

        {/* <Typography
          variant="2"
          textAlign="center"
          component="h2"
          color={(theme) => theme.palette.primary.main}
        >
          Feed
        </Typography> */}
        {/* <SearchUserSection /> */}
        {/* <Typography variant="5" component='h5' marginBottom={2}>Suggested users</Typography> */}
        <UserProfileGrid
          hasMore={hasMore}
          onNext={() => setPage((prevPage) => prevPage + 1)}
          onMatch={handleMatch}
          users={feed}
          loading={isLoadingUsers}
          error={error}
        />
      </Box>
    </Box>
  );
};

BrowseUserPage.requiredAuth = true;

export default BrowseUserPage;
