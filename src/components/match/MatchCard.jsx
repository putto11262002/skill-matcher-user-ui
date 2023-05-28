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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { truncate } from "lodash";
import Link from "next/link";
import StarIcon from "@mui/icons-material/Star";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import Rating from "@mui/material/Rating";
import { grey } from "@mui/material/colors";
import ReviewDialog from "../review/ReviewDialog";
import { useMutation } from "@tanstack/react-query";
import reviewService from "@/services/review.service";
import { enqueueSnackbar } from "notistack";

const MatchCard = ({ user, onMatch, onUnmatch }) => {
  const [matched, setMatched] = useState(false);
  const [openReviewDialog, setOpenReviewDialog] = useState(undefined);

  const { mutate: createReview } = useMutation(reviewService.createReview, {
    onSuccess: (res) =>
      enqueueSnackbar("Review submitted", { variant: "success" }),
     onError: (error) => enqueueSnackbar(error?.message, {variant: 'error'}),
  });

  const handleOpenReviewDialog = (target) => {
    setOpenReviewDialog(target);
  };

  const handleCloseReviewDialog = () => {
    setOpenReviewDialog(undefined);
  };

  const handleCreateReview = (review) => {
    createReview({ ...review, target: user._id, score: Number(review.score) });
  };

  return (
    <Card>
      <ReviewDialog
        open={Boolean(openReviewDialog)}
        onSubmit={handleCreateReview}
        target={openReviewDialog}
        onClose={handleCloseReviewDialog}
      />
      <CardHeader
        avatar={<Avatar src={user?.avatar?.url || "/images/no-avatar.jpg"} />}
        subheader={`${user?.email}`}
        title={`${user?.profile?.firstName} ${user?.profile?.lastName}`}
      />
      <CardContent sx={{ paddingY: 1 }}>
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
          {" "}
          <Tooltip title="View profile">
            <Link href={`/user/profile/${user?._id}`}>
              <IconButton sx={{ width: "100%", height: "100%" }}>
                <VisibilityIcon
                  sx={{ color: (theme) => theme.palette.secondary.main }}
                />
              </IconButton>
            </Link>
          </Tooltip>
        </Box>
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
          {" "}
          <Tooltip title="Rate user">
            <IconButton
              sx={{ width: "100%", height: "100%" }}
              onClick={() => handleOpenReviewDialog(user)}
            >
              <ReviewsOutlinedIcon
                sx={{ color: (theme) => theme.palette.secondary.main }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
};

export default dynamic(() => Promise.resolve(MatchCard), {
  ssr: false,
});
