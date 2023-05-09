import userService from "@/services/user.service";
import { Circle, Star } from "@mui/icons-material";
import dynamic from "next/dynamic";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  ListItemIcon,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UserSkill from "./skills/UserSkill";
import Loader from "../common/Loader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { truncate } from "lodash";
import Link from "next/link";
import { grey } from "@mui/material/colors";
const UserProfileCard = ({ user, onMatch }) => {
  const [matched, setMatched] = useState(false);
  // const {
  //   isLoading: isLoadingSkill,
  //   data,
  //   error,
  // } = useQuery(["user", user._id, "skills"], () =>
  //   userService.getUserSkills({ userId: user._id, query: {} })
  // );

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
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {user?.profile?.skills.map((skill) => (
              <Box key={skill}>
                <Button
                  disableElevation
                  sx={{
                    background: (theme) => theme.palette.secondary.main,
                    ":hover": {
                      background: (theme) => theme.palette.secondary.main,
                    },
                  }}
                  variant="info"
                >
                  {skill}
                </Button>
              </Box>
            ))}
          </Box>
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
        {!matched && (
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
            <Tooltip title={`Match with ${user.profile.firstName}`}>
              <IconButton
                onClick={() => {
                  setMatched(true);
                  onMatch(user);
                }}
              >
                <HandshakeIcon
                  sx={{ color: (theme) => theme.palette.common.white }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        )}
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
          <Tooltip title="View profile">
            <Link href={`/user/profile/${user._id}`}>
              <IconButton sx={{ width: "100%", height: "100%" }}>
                <VisibilityIcon
                  sx={{ color: (theme) => theme.palette.common.white }}
                />
              </IconButton>
            </Link>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
};

export default dynamic(() => Promise.resolve(UserProfileCard), {
  ssr: false,
});
