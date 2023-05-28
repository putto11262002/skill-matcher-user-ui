import React, { useEffect, useState } from "react";

import UserProfileGrid from "@/components/user/UserProfileGrid";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { USER_PAGE_SIZE } from "@/constants/user.constant";
import { Box, Button } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import matchService from "../../../services/match.service";
import feedService, { FeedService } from "@/services/feed.service";
import { enqueueSnackbar } from "notistack";
import userService from "../../../services/user.service";
import Loader from "@/components/common/Loader";

/**
 * Note:
 *  Use this to only refetch first page
 *  refetch({ refetchPage: (page, index) => index === 0 })}
 */

const BrowseUserPage = () => {
  useAuth();

 

  const { isLoading, data, fetchNextPage, error, hasNextPage, isInitialLoading } =
    useInfiniteQuery(
      ["user", "rank"],
      async ({ pageParam = 0 }) => {
        const res = await userService.getRankedUser({
          pageSize: USER_PAGE_SIZE,
          pageNumber: pageParam,
        });

        return res?.data?.data;
      },
      {
        refetchOnWindowFocus: false,

        getNextPageParam: (lastPage, allPages) => {
          const nextPage =
            lastPage.length === USER_PAGE_SIZE ? allPages.length : undefined;
  
          return nextPage
        }
      }
    );

  const { mutate: matchUser } = useMutation(matchService.sendMatchRequest, {
    onSuccess: (res) =>
      enqueueSnackbar("Match request has been sent", { variant: "success" }),
    onError: (err) => enqueueSnackbar(err.message, { variant: "error" }),
  });

  const handleMatch = (user) => {
    matchUser({ userId: user._id });
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box maxWidth={600} sx={{ width: "100%" }}>
        <UserProfileGrid
          hasMore={hasNextPage}
          onNext={() => fetchNextPage()}
          onMatch={handleMatch}
          users={data?.pages?.flat()}
          loading={isLoading}
          error={error}
          initialLoading={isInitialLoading}
        />
      </Box>
    </Box>
  );
};

BrowseUserPage.requiredAuth = true;

export default BrowseUserPage;
