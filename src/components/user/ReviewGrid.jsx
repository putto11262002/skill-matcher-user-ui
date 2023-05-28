import { Box, CircularProgress, Grid, Pagination, Stack, Typography } from "@mui/material";
import React from "react";
import Loader from "../common/Loader";
import Error from "../common/Error";
import dynamic from "next/dynamic";
import InfiniteScroll from "react-infinite-scroll-component";
import ReviewCard from "./ReviewCard";
import Button from '@mui/material/Button';
import Link from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const ReviewGrid = ({
    error,
    users,
    onMatch,
    onUnmatch,
    onNext,
    hasMore
}) => {
    if (error) return <Error />;

    return (
        <InfiniteScroll
            dataLength={users.length}
            next={onNext}
            hasMore={hasMore}
            scrollThreshold={1}
            loader={<Box sx={{ marginTop: 3 }}><Loader /></Box>}
            style={{ overflow: "unset" }}
        >
            <Grid rowSpacing={3} container>
                {users.map((user) => (
                    <Grid key={user._id} xs={12} item>
                        <ReviewCard user={user} userId={user._id} />
                    </Grid>
                ))}
            </Grid>
        </InfiniteScroll>
    );
};



export default dynamic(() => Promise.resolve(ReviewGrid), {
    ssr: false
})

