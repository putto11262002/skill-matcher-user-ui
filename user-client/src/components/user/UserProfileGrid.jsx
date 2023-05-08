import { Grid, Pagination, Stack, Typography } from "@mui/material";
import React from "react";
import UserProfileCard from "./UserProfileCard";
import Loader from "../common/Loader";
import Error from "../common/Error";
import dynamic from "next/dynamic";
import InfiniteScroll from "react-infinite-scroll-component";
const UserProfileGrid = ({
  loading,
  error,
  users,
  pageSize,
  total,
  page,
  onPageChange,
  onMatch,
  onNext,
  hasMore
}) => {
  console.log(users)
  if (loading) return <Loader />;
  if (error) return <Error />;
  if(users?.length < 1) return <Typography sx={{textAlign: 'center'}}>No more users</Typography>
  
  return (
   
      <InfiniteScroll
      dataLength={users.length}
      next={onNext}
      hasMore={hasMore}
     
      >
      <Grid rowSpacing={3} container>
        {users.map((user) => (
          <Grid key={user._id} xs={12} item>
            <UserProfileCard onMatch={onMatch} user={user} />
          </Grid>
        ))}
      </Grid>
      </InfiniteScroll>
    
   
  );
};



export default dynamic(() => Promise.resolve(UserProfileGrid), {
  ssr: false
})
