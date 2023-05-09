import { Box, CircularProgress, Grid, Pagination, Stack, Typography } from "@mui/material";
import React from "react";
import Loader from "../common/Loader";
import Error from "../common/Error";
import dynamic from "next/dynamic";
import InfiniteScroll from "react-infinite-scroll-component";
import MatchCard from "./MatchCard";
const MatchGrid = ({
  // loading,
  error,
  users,
  // pageSize,
  // total,
  // page,
  // onPageChange,
  onMatch,
  onNext,
  hasMore
}) => {

  // if (loading) return <Loader />;
  if (error) return <Error />;
  // if(users?.length < 1) return <Typography sx={{textAlign: 'center'}}>No more users</Typography>

  
  return (
   
      <InfiniteScroll
      dataLength={users.length}
      next={onNext}
      hasMore={hasMore}
      scrollThreshold={1}
      loader={<Box sx={{marginTop: 3}}><Loader/></Box>}
      style={{ overflow: "unset" }}
      
      
      >
      <Grid rowSpacing={3} container>
        {users.map((user) => (
          <Grid key={user._id} xs={12} item>
            <MatchCard onMatch={onMatch} user={user} />
          </Grid>
        ))}
      </Grid>
      </InfiniteScroll>
    
   
  );
};



export default dynamic(() => Promise.resolve(MatchGrid), {
  ssr: false
})
