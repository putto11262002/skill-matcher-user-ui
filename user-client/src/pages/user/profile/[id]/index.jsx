import dynamic from "next/dynamic";
import Image from "next/image";
import * as React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Grid, IconButton, Stack, Tooltip } from "@mui/material";
import { Avatar } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import userService from "@/services/user.service";
import Loader from "@/components/common/Loader";
import UserSkill from "@/components/user/skills/UserSkill";
import Link from "next/link";
import UserSkillTabs from "@/components/user/skills/UserSkillTabs";
import useAuth from "@/hooks/useAuth";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { yellow } from "@mui/material/colors";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
const UserHomePage = () => {
  useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(undefined);
  const [userTutorSkills, setUserTutorSkills] = useState([]);
  const [userLearningSkills, setUserLearningSkills] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [snapchat, setSnapchat] = useState("");
  const [facebook, setFacebook] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [matched, setMatched] = useState(false);

  // fetching user profile
  const {
    isLoading: isLoadingUser,
    error,
    refetch: fetchUser,
  } = useQuery(["user", id], () => userService.getUserById(id), {
    onSuccess: (res) => {
      setUser(res.data);
      console.log(res?.data?.matched);
      setMatched(res?.data?.matched);
    },
    enabled: false,
  });

  //fetching user details
  // const { isLoading: isLoadingUserdetails, error: errorUserDetails, refetch: fetchUserDetails } = useQuery(
  //   ["user", ],
  //   userService.getSelf,
  //   {
  //     onSuccess: (res) => {

  //       setUser(res.data);
  //       setFirstName(res.data?.profile?.firstName || '');
  //       setLastName(res.data?.profile?.lastName || '');
  //       setAboutMe(res.data?.aboutMe || '');
  //       setPhoneNumber(res.data?.phoneNumber || '');
  //       setEmail(res.data?.email || '');
  //       setInstagram(res.data?.instagram || '');
  //       setSnapchat(res.data?.snapchat || '');
  //       setFacebook(res.data?.facebook || '');
  //       setWhatsapp(res.data?.whatsapp || '');
  //       setMatched(res?.data?.matched)
  //     },
  //     enabled: false
  //   }
  // );

  // console.log(matched)

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
      fetchUser();
    }
  }, [id]);

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
      setFirstName(user?.profile?.firstName || "");
      setLastName(user?.profile?.lastName || "");
      setAboutMe(user?.aboutMe || "");
      setPhoneNumber(user?.phoneNumber || "");
      setEmail(user?.email || "");
      setInstagram(user?.instagram || "");
      setSnapchat(user?.snapchat || "");
      setFacebook(user?.facebook || "");
      setWhatsapp(user?.whatsapp || "");
    }
  }, [user, fetchUserTutorSkills, fetchUserLearningSkills]);

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
            sx={{ width: 130, height: 130 }}
          />
          <Stack
            alignItems="center"
            sx={{ width: "100%", textAlign: "left" }}
            spacing={2}
          >
            <Typography sx={{}}>
              {user?.profile?.firstName} {user?.profile?.lastName}
            </Typography>

            <Typography sx={{ textAlign: "center" }}>
              About Me: {user?.profile?.aboutMe}
            </Typography>
            <Grid sx={{ justifyContent: "center" }} gap={2} container>
              <InfoBadge
                display={matched}
                label={<EmailIcon />}
                value={user?.profile?.email || user?.email}
              />
              <InfoBadge
                display={matched}
                label={<PhoneIcon />}
                value={user?.profile?.phoneNumber}
              />

              <InfoBadge
                display={matched && user?.profile?.facebook}
                label={<FacebookIcon />}
                value={user?.profile?.facebook}
              />
              <InfoBadge
                display={matched && user?.profile?.instagram}
                label={<InstagramIcon />}
                value={user?.profile?.instagram}
              />
              <InfoBadge
                display={matched && user?.profile?.whatsapp}
                label={<WhatsAppIcon />}
                value={user?.profile?.whatsapp}
              />

              {/* {user?.matched &&   <Typography sx={{ mb: 6, marginLeft: 0  }}>About me: {aboutMe}</Typography>}
     
          {user?.matched &&   <Typography sx={{ mb: 8, marginLeft: 0  }}>Instagram: {instagram}</Typography>}
         {user?.matched &&   <Typography sx={{ mb: 9, marginLeft: 0  }}>Snapchat: {snapchat}</Typography>}
           {user?.matched &&  <Typography sx={{ mb: 10, marginLeft: 0  }}>Whatsapp: {whatsapp}</Typography>}  */}
            </Grid>
            {!matched && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                <Button
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                  }}
                  variant="contained"
                >
                  <HandshakeIcon /> <Typography>Match</Typography>
                </Button>
              </Box>
            )}
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

const InfoBadge = ({ display, label, value }) => {
  if (!display) return null;
  return (
    <Grid
      sx={{
        background: (theme) => theme.palette.secondary.main,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingY: 1,
        paddingX: 2,
        borderRadius: 2,
        gap: 1,
      }}
      item
    >
      {label} <Typography> {value}</Typography>
    </Grid>
  );
};

UserHomePage.requiredAuth = true;

export default dynamic(() => Promise.resolve(UserHomePage), {
  ssr: false,
});
