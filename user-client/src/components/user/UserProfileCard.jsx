import userService from "@/services/user.service";
import { Circle, Star } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import UserSkill from "./skills/UserSkill";
import Loader from "../common/Loader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { truncate } from "lodash";
const UserProfileCard = ({ user }) => {
  const {
    isLoading: isLoadingSkill,
    data,
    error,
  } = useQuery(["user", user._id, "skills"], () =>
    userService.getUserSkills({ userId: user._id, query: {} })
  );

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={user?.avatar?.url || "/images/no-avatar.jpg"} />}
        subheader={`${user.email}`}
        title={`${user?.profile?.firstName} ${user?.profile?.lastName}`}
      />
      <CardContent sx={{ paddingY: 1 }}>
        {/* <UserSkill skill='Computer science' proficiency={6}/> */}
        <Stack spacing={2}>
          {user?.profile?.aboutMe && (
            <Typography color={(theme) => theme.palette.text.secondary}>
              {truncate(user?.profile?.aboutMe, { length: 200 })}
            </Typography>
          )}
          <Stack spacing={2}>
            <Stack spacing={0.5}>
              {(!isLoadingSkill || !error) &
              (data?.data?.data?.filter((skill) => skill.role === "learner")
                .length >
                0) ? (
                <Typography
                  variant="body2"
                  fontWeight={(theme) => theme.typography.fontWeightBold}
                >
                  Learns
                </Typography>
              ) : null}
              {isLoadingSkill || error ? (
                <Loader />
              ) : (
                data?.data?.data
                  .filter((skill) => skill.role === "learner")
                  .map((skill) => (
                    <UserSkill
                      key={skill.skill + skill.role}
                      skill={skill.skill}
                      proficiency={skill.proficiency}
                    />
                  ))
              )}
            </Stack>
            <Stack spacing={0.5}>
              {(!isLoadingSkill || !error) &
              (data?.data?.data?.filter((skill) => skill.role === "tutor")
                .length >
                0) ? (
                <Typography
                  variant="body2"
                  fontWeight={(theme) => theme.typography.fontWeightBold}
                >
                  Teaches
                </Typography>
              ) : null}
              {isLoadingSkill || error ? (
                <Loader />
              ) : (
                data?.data?.data
                  .filter((skill) => skill.role === "tutor")
                  .map((skill) => (
                    <UserSkill
                      key={skill.skill + skill.role}
                      skill={skill.skill}
                      proficiency={skill.proficiency}
                    />
                  ))
              )}
            </Stack>
          </Stack>
        </Stack>
      </CardContent>

      <CardActions
        sx={{
          paddingX: (theme) => theme.spacing(2),
          paddingBottom: (theme) => theme.spacing(2),
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            background: (theme) => theme.palette.primary.main,
            width: "2rem",
            height: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
          }}
        >
          <IconButton>
            <HandshakeIcon
              sx={{ color: (theme) => theme.palette.common.white }}
            />
          </IconButton>
        </Box>
        <Box
          sx={{
            background: (theme) => theme.palette.grey[400],
            width: "2rem",
            height: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
          }}
        >
          {" "}
          <IconButton>
            <VisibilityIcon
              sx={{ color: (theme) => theme.palette.common.white }}
            />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default UserProfileCard;
