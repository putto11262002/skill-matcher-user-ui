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
import StarIcon from '@mui/icons-material/Star';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import Rating from "@mui/material/Rating";
import { grey } from "@mui/material/colors";

const MatchCard = ({ user, onMatch, onUnmatch }) => {
  const [matched, setMatched] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingComment, setRatingComment] = useState('');

  const handleRatingSubmit = () => {
    // Access the rating and comment values
    const rating = ratingValue;
    const comment = ratingComment;
  
    //actions with the rating and comment values
 
    // Reset the state variables
    setRatingValue(0);
    setRatingComment('');
  
    // Close the dialog
    setDialogOpen(false);
  };

  return (
    <Card>
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
        {/* <Box
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
          <Tooltip title="Unmatch with user">
            <IconButton onClick={() => onUnmatch(user)}
              sx={{ width: "100%", height: "100%" }}>
              <CloseIcon
                sx={{ color: (theme) => theme.palette.secondary.main }}
              />
            </IconButton>
          </Tooltip>
        </Box>*/}

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
              onClick={() => setDialogOpen(true)}>
              <ReviewsOutlinedIcon
                sx={{ color: (theme) => theme.palette.secondary.main }}
              />
            </IconButton>
          </Tooltip>
        </Box>
          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>Rate {user?.profile?.firstName} {user?.profile?.lastName}&apos;s performance </DialogTitle>
            <DialogContent sx={{ width: 400, height: 200 }}>
              <Rating
                name="user-rating"
                value={ratingValue}
                onChange={(event, newValue) => setRatingValue(newValue)}
                size="large"
              />
              <TextField
                id="rating-comment"
                label="Comment"
                multiline
                rows={4}
                value={ratingComment}
                onChange={(event) => setRatingComment(event.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => handleRatingSubmit()} variant="contained" color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
      </CardActions>
    </Card >


  );
};

export default dynamic(() => Promise.resolve(MatchCard), {
  ssr: false,
});
