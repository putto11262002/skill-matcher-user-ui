import { Grid, Pagination, Stack, Typography } from "@mui/material";
import React from "react";
import UserProfileCard from "./UserProfileCard";
import Loader from "../common/Loader";
import Error from "../common/Error";

const UserProfileGridPage = ({
  loading,
  error,
  users,
  pageSize,
  total,
  page,
  onPageChange,
}) => {
  if (loading) return <Loader />;
  if (error) return <Error />;
  return (
    <Stack spacing={3} sx={{ justifyContent: "center", alignItems: "center" }}>
      <Grid rowSpacing={3} columnSpacing={2} container>
        {users.map((user) => (
          <Grid key={user._id} xs={12} item>
            <UserProfileCard user={user} />
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

export default UserProfileGridPage;
