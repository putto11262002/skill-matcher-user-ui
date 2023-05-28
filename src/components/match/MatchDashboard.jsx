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
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { truncate } from "lodash";
import Link from "next/link";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { grey } from "@mui/material/colors";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from "next/router";

const MatchRequestCard = ({ user, onDecline, onAccept }) => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={user?.avatar?.url || "/images/no-avatar.jpg"} />}
        subheader={`${user?.email}`}
        title={`${user?.profile?.firstName} ${user?.profile?.lastName}`}
      />
      <CardContent sx={{ paddingY: 1 }}>
        {/* <UserSkill skill='Computer science' proficiency={6}/> */}
        <Stack spacing={2}></Stack>
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
            background: grey[100],
            width: "2.5rem",
            height: "2.5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
          }}
        >

          <Tooltip title="View profile">
            <IconButton
            onClick={() => router.push(`/user/profile/${user._id}`)}
              
              sx={{ width: "100%", height: "100%" }}
            >
              <VisibilityIcon
                sx={{ color: (theme) => theme.palette.secondary.main }}
              />
            </IconButton>
          </Tooltip>
        </Box>
        
      </CardActions>
    </Card>
  );
};

export default dynamic(() => Promise.resolve(MatchRequestCard), {
  ssr: false,
});
