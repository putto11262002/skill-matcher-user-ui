import dynamic from "next/dynamic";
import Image from "next/image";
import * as React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { Avatar } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import userService from "@/services/user.service";
import Loader from "@/components/common/Loader";
import UserSkill from "@/components/user/skills/UserSkill";
import Link from "next/link";
import UserSkillTabs from "@/components/user/skills/UserSkillTabs";



const UserHomePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(undefined);
  const [userTutorSkills, setUserTutorSkills] = useState([]);
  const [userLearningSkills, setUserLearningSkills] = useState([]);

  // fetching user profile
  const { isLoading: isLoadingUser, error, refetch: fetchUser } = useQuery(
    ["user", id],
    () => userService.getUserById(id),
    { onSuccess: (res) => setUser(res.data), enabled: false }
  );

  // fetching user skills (tutor)
  const {
    isLoading: isLoadingUserTutorSkills,
    refetch: fetchUserTutorSkills,
    error: errorUserTutorSkills,
  } = useQuery(
    ["user", id, "skills", "tutor"],
    () =>
      userService.getUserSkills({
        userId: user._id,
        query: { role: "tutor" },
      }),
    { enabled: false, onSuccess: (res) => setUserTutorSkills(res.data.data) }
  );

  // fetching user skills (learner)
  const {
    isLoading: isLoadingUserLearningSkills,
    refetch: fetchUserLearningSkills,
    error: errorUserLearningSkills,
  } = useQuery(
    ["user", id, "skills", "learner"],
    () =>
      userService.getUserSkills({
        userId: user._id,
        query: { role: "learner" },
      }),
    { enabled: false, onSuccess: (res) => setUserLearningSkills(res.data.data) }
  );

  useEffect(() => {
    if(id){
        fetchUser()
    }
  }, [id])

  useEffect(() => {
    if (user) {
      fetchUserTutorSkills();
      fetchUserLearningSkills();
    }
  }, [user]);

  if (isLoadingUser) {
    return <Loader />;
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box maxWidth={600} width="100%">
        <Stack alignItems="center" sx={{ width: "100%" }} spacing={2}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <Tooltip title="Go back">
              
              <IconButton onClick={router.back} sx={{ width: "auto" }}>
                  <ArrowBackIcon />
                </IconButton>
             
              </Tooltip>
            </Box>
          </Box>

          <Avatar
            src={user?.avatar?.url || "/images/no-avatar.jpg"}
            sx={{ width: 130, height: 130,  }}
          />

          <Typography component='h3' variant="3">{user?.profile?.firstName} {user?.profile?.lastName}</Typography>

          <UserSkillTabs
            tutorSkills={userTutorSkills}
            isLoadingTutorSkills={isLoadingUserTutorSkills}
            errorTutorSkills={errorUserTutorSkills}
            learningSkills={userLearningSkills}
            isLoadingLearningSkills={isLoadingUserLearningSkills}
            errorLearningSkills={errorUserLearningSkills}
          />
        </Stack>
      </Box>
    </Box>
  );
};

UserHomePage.requiredAuth = true;

export default dynamic(() => Promise.resolve(UserHomePage), {
  ssr: false,
});
