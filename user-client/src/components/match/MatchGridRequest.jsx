import { Box, CircularProgress, Grid, Pagination, Stack, Typography } from "@mui/material";
import React from "react";
import Loader from "../common/Loader";
import Error from "../common/Error";
import dynamic from "next/dynamic";
import InfiniteScroll from "react-infinite-scroll-component";
import MatchCardRequest from "./MatchCardRequest";
import Button from '@mui/material/Button';

const MatchGridRequest = ({
  // loading,
  error,
  users,
  // pageSize,
  // total,
  // page,
  // onPageChange,
  onDecline,
  onAccept,
  onNext,
  hasMore
}) => {

  // if (loading) return <Loader />;
  if (error) return <Error />;
  // if(users?.length < 1) return <Typography sx={{textAlign: 'center'}}>No more users</Typography>

console.log(users)
  
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
          <Grid key={user._id}  xs={12} item>
            <MatchCardRequest onDecline={onDecline} onAccept={onAccept} user={user} />
            
          </Grid>
        ))}
      </Grid>
      </InfiniteScroll>
    
    
  );
};



export default dynamic(() => Promise.resolve(MatchGridRequest), {
  ssr: false
})
