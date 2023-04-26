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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [snapchat, setSnapchat] = useState('');
  const [facebook, setFacebook] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  // fetching user profile
  const { isLoading: isLoadingUser, error, refetch: fetchUser } = useQuery(
    ["user", id],
    () => userService.getUserById(id),
    { onSuccess: (res) => setUser(res.data), enabled: false }
  );

  //fetching user details
  const { isLoading: isLoadingUserdetails, error: errorUserDetails, refetch: fetchUserDetails } = useQuery(
    "user",
    userService.getSelf,
    {
      onSuccess: (res) => {
        setUser(res.data);
        setFirstName(res.data?.profile?.firstName || '');
        setLastName(res.data?.profile?.lastName || '');
        setAboutMe(res.data?.aboutMe || '');
        setPhoneNumber(res.data?.phoneNumber || '');
        setEmail(res.data?.email || '');
        setInstagram(res.data?.instagram || '');
        setSnapchat(res.data?.snapchat || '');
        setFacebook(res.data?.facebook || '');
        setWhatsapp(res.data?.whatsapp || '');
      },
      enabled: false
    }
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
    if (id) {
      fetchUser()
    }
  }, [id])

  useEffect(() => {
    if (user) {
      fetchUserTutorSkills();
      fetchUserLearningSkills();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchUserTutorSkills();
      fetchUserLearningSkills();
      setFirstName(user?.profile?.firstName || '');
      setLastName(user?.profile?.lastName || '');
      setAboutMe(user?.aboutMe || '');
      setPhoneNumber(user?.phoneNumber || '');
      setEmail(user?.email || '');
      setInstagram(user?.instagram || '');
      setSnapchat(user?.snapchat || '');
      setFacebook(user?.facebook || '');
      setWhatsapp(user?.whatsapp || '');
    }
  }, [user, fetchUserTutorSkills, fetchUserLearningSkills]);

  if (isLoadingUser) {
    return <Loader />;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
            sx={{ width: 130, height: 130, }}
          />
          <Stack alignItems="center" sx={{ width: "100%", textAlign: "left" }} spacing={2}>
            <Typography sx={{ mb: 2, marginLeft: 0 }}>First name: {firstName}</Typography>
            <Typography sx={{ mb: 3, marginLeft: 0  }}>Last name: {lastName}</Typography>
            <Typography sx={{ mb: 4, marginLeft: 0  }}>Email: {email}</Typography>
            <Typography sx={{ mb: 5, marginLeft: 0  }}>Phone: {phoneNumber}</Typography>
            <Typography sx={{ mb: 6, marginLeft: 0  }}>About me: {aboutMe}</Typography>
            <Typography sx={{ mb: 7, marginLeft: 0  }}>Facebook: {facebook}</Typography>
            <Typography sx={{ mb: 8, marginLeft: 0  }}>Instagram: {instagram}</Typography>
            <Typography sx={{ mb: 9, marginLeft: 0  }}>Snapchat: {snapchat}</Typography>
            <Typography sx={{ mb: 10, marginLeft: 0  }}>Whatsapp: {whatsapp}</Typography>
          </Stack>
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
