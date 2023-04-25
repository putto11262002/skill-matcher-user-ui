import React, { useState } from "react";

import UserProfileGrid from "@/components/user/UserProfileGrid";
import { useQuery } from "@tanstack/react-query";
import userService from "@/services/user.service";
import { USER_PAGE_SIZE } from "@/constants/user.constant";
import { Box, Stack, Typography } from "@mui/material";
import SkillSlider from "@/components/skill/SkillSlider";
const BrowseUserPage = () => {
  const [query, setQuery] = useState({});
  const [page, setPage] = useState(0);
  const {
    isLoading: isLoadingUsers,
    data,
    error,
  } = useQuery(['users', page, query], () =>
    userService.searchUsers({
      ...query,
      pageSize: USER_PAGE_SIZE,
      pageNumber: page,
    })
  );
  return (
    <Box  sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
   <Box maxWidth='sm'  >
   {/* <SkillSlider  skills={['computer science', 'java', 'python', 'machine learning', 'amazon web services', 'google cloud', 'go', 'rust']}/> */}

   
      {/* <SearchUserSection /> */}
    {/* <Typography variant="5" component='h5' marginBottom={2}>Suggested users</Typography> */}
     <UserProfileGrid
        users={data?.data?.data}
        loading={isLoadingUsers}
        error={error}
      />
     
     </Box>
     </Box>
  );
};

export default BrowseUserPage;
