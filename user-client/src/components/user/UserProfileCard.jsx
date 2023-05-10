import userService from "@/services/user.service";
import AddIcon from "@mui/icons-material/Add";
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
import CircularIconButton from "../common/buttons/CircularIconButton";
import { useRouter } from "next/router";
const UserProfileCard = ({ user, onMatch }) => {
  const router = useRouter()
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
        subheader={`${user.username}`}
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
                    background: grey[200],
                    ":hover": {
                      background: grey[200],
                    },
                  }}
                  variant="round"
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
          <CircularIconButton
          
            icon={<AddIcon color="primary"/>}
            tooltip="Request match"
            onClick={() => {
              setMatched(true);
              onMatch(user);
            }}
          />
        )}

        {/* <Box
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
        </Box> */}

        <CircularIconButton icon={<VisibilityIcon color="secondary"/>} onClick={() => router.push(`/user/profile/${user._id}`)} tooltip="View profile"/>
      </CardActions>
    </Card>
  );
};

export default dynamic(() => Promise.resolve(UserProfileCard), {
  ssr: false,
});
