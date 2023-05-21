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
import UserSkill from "@/components/user/skill/UserSkill";
import Link from "next/link";
import UserSkillTabs from "@/components/user/skill/UserSkillTabs";
import useAuth from "@/hooks/useAuth";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { amber, blue, green, red, yellow } from "@mui/material/colors";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import TextIconButton from "../../../../components/common/buttons/TextIconButton";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useTheme } from "@material-ui/core";
import matchService from "../../../../services/match.service";
import { enqueueSnackbar } from "notistack";
const UserHomePage = () => {
  useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(undefined);
  const [userTutorSkills, setUserTutorSkills] = useState([]);
  const [userLearningSkills, setUserLearningSkills] = useState([]);
  const [matchStatus, setMatchStatus] = useState(false);
  const theme = useTheme();

  // fetching user profile
  const {
    isLoading: isLoadingUser,
    error,
    refetch: fetchUser,
  } = useQuery(["user", id], () => userService.getUserProfileById(id), {
    onSuccess: (res) => {
      setUser(res.data);
      setMatchStatus(res?.data?.matchStatus);
    },
    enabled: false,
  });

  const matched = matchStatus === "matched";
  const requested = matchStatus === "requested";
  const requesting = matchStatus === "requesting";

  const {mutate: handleSendMatchRequest} = useMutation(matchService.sendMatchRequest, {
    onSuccess: () => {
      setMatchStatus("requested");
      enqueueSnackbar("Match request has been sent", { variant: "success" });
    },
    onError: (err) => enqueueSnackbar(err.message, { variant: "error" }),
  });

  const {mutate: handleAcceptRequest} = useMutation(matchService.acceptMatchRequest, {
    onSuccess: () => {
      setMatchStatus("matched");
      enqueueSnackbar("Match accepted", { variant: "success" });
    },
    onError: (err) => enqueueSnackbar(err.message, { variant: "error" }),

  })


  const {mutate: handleRejectRequest} = useMutation(matchService.acceptMatchRequest, {
    onSuccess: () => {
      setMatchStatus("not_matched");
      enqueueSnackbar("Match rejected", { variant: "success" });
    },
    onError: (err) => enqueueSnackbar(err.message, { variant: "error" }),

  })


  const {mutate: handleUnmatch} = useMutation(matchService.unMatch, {
    onSuccess: () => {
      setMatchStatus("not_matched");
      enqueueSnackbar("Unmatched", { variant: "success" });
    },
    onError: (err) => enqueueSnackbar(err.message, { variant: "error" }),

  })


  // fetch user when id is available
  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  if (isLoadingUser) {
    return <Loader />;
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box maxWidth={600} width="100%">
        <Stack alignItems="center" sx={{ width: "100%" }} spacing={4}>
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

          <Typography sx={{}}>
            {user?.profile?.firstName} {user?.profile?.lastName}
          </Typography>

          <Typography sx={{ textAlign: "center" }}>
            {user?.profile?.aboutMe}
          </Typography>

          <Grid sx={{ justifyContent: "center" }} gap={2} container>
            {/* <InfoBadge
              display={matched}
              label={<EmailIcon />}
              value={user?.profile?.email || user?.email}
            /> */}

            {matched && (user?.profile?.email || user?.email) && (
              <Grid item>
                <TextIconButton
                  variant="round"
                  icon={<EmailIcon />}
                  text={user?.profile?.email || user?.email}
                  color={theme.palette.text.main}
                  bg={amber[300]}
                />
              </Grid>
            )}

            {matched && user?.profile?.phoneNumber && (
              <Grid item>
                <TextIconButton
                  variant="round"
                  icon={<PhoneIcon />}
                  text={user?.profile?.phoneNumber}
                  color={theme.palette.text.main}
                  bg={amber[300]}
                />
              </Grid>
            )}

            {matched && user?.profile?.facebook && (
              <Grid item>
                <TextIconButton
                  variant="round"
                  icon={<FacebookIcon />}
                  text={user?.profile?.facebook}
                  color={theme.palette.text.main}
                  bg={amber[300]}
                />
              </Grid>
            )}

            {matched && user?.profile?.instagram && (
              <Grid item>
                <TextIconButton
                  variant="round"
                  icon={<InstagramIcon />}
                  text={user?.profile?.instagram}
                  color={theme.palette.text.main}
                  bg={amber[300]}
                />
              </Grid>
            )}

            {matched && user?.profile?.whatsapp && (
              <Grid item>
                <TextIconButton
                  variant="round"
                  icon={<WhatsAppIcon />}
                  text={user?.profile?.whatsapp}
                  color={theme.palette.text.main}
                  bg={amber[300]}
                />
              </Grid>
            )}
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              columnGap: 2,
            }}
          >
            {!(matched || requested || requesting) && (
              <TextIconButton
                icon={<PersonAddIcon />}
                text="Request match"
                color={theme.palette.primary.main}
                bg={blue[50]}
                onClick={() => handleSendMatchRequest({userId: user._id})}
              />
            )}
            {requested && (
              <TextIconButton
                icon={<AccessTimeFilledIcon />}
                text="Pending"
                color={yellow[700]}
                bg={yellow[50]}
              />
            )}

            {requesting && (
              <TextIconButton
                icon={<DoneIcon />}
                color={green[700]}
                bg={green[50]}
                text="Accept"
                onClick={() => handleAcceptRequest({userId: user._id})}
              />
            )}
            {requesting && (
              <TextIconButton
                text="Reject"
                icon={<CloseIcon />}
                bg={red[50]}
                color={red[700]}
                onClick={() => handleRejectRequest({userId: user._id})}
              />
            )}
            {matched && (
              <TextIconButton
                icon={<PersonRemoveIcon />}
                bg={red[50]}
                color={red[700]}
                text="Unmatch"
                onClick={() => handleUnmatch({userId: user._id})}
              />
            )}
          </Box>
          <UserSkillTabs
            tutorSkills={user?.profile?.skills?.filter(
              (s) => s.role === "tutor"
            )}
            isLoadingTutorSkills={isLoadingUser}
            errorTutorSkills={error}
            learningSkills={user?.profile?.skills?.filter(
              (s) => s.role === "learner"
            )}
            isLoadingLearningSkills={isLoadingUser}
            errorLearningSkills={error}
          />
        </Stack>
      </Box>
    </Box>
  );
};

const InfoBadge = ({ display, label, value }) => {
  if (!display) return null;
  return (
    <Grid item>
      <Button
        disableElevation
        sx={{
          background: (theme) => theme.palette.secondary.main,
          ":hover": {
            background: (theme) => theme.palette.secondary.main,
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
        variant="round"
      >
        {label} {value}
      </Button>
    </Grid>
  );
};

UserHomePage.requiredAuth = true;

export default dynamic(() => Promise.resolve(UserHomePage), {
  ssr: false,
});
