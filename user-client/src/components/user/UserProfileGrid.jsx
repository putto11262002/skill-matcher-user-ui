import { Grid, Pagination, Stack, Typography } from "@mui/material";
import React from "react";
import UserProfileCard from "./UserProfileCard";
import Loader from "../common/Loader";
import Error from "../common/Error";
import dynamic from "next/dynamic";
const UserProfileGrid = ({
  loading,
  error,
  users,
  pageSize,
  total,
  page,
  onPageChange,
  onMatch
}) => {
  console.log(users)
  if (loading) return <Loader />;
  if (error) return <Error />;
  if(users?.length < 1) return <Typography sx={{textAlign: 'center'}}>No more users</Typography>
  return (
    <Stack spacing={3} sx={{ justifyContent: "center", alignItems: "center" }}>
      <Grid rowSpacing={3} container>
        {users.map((user) => (
          <Grid key={user._id} xs={12} item>
            <UserProfileCard onMatch={onMatch} user={user} />
          </Grid>
        ))}
      </Grid>
      {/* <Pagination
        onChange={(e, newPage) => onPageChange(newPage)}
        count={Math.ceil(total / pageSize)}
        page={page}
      /> */}
    </Stack>
  );
};



export default dynamic(() => Promise.resolve(UserProfileGrid), {
  ssr: false
})
