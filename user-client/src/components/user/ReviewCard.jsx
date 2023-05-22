import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Card, CardContent } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Avatar, CardActions, CardHeader, IconButton, Link, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import dynamic from "next/dynamic";

const ReviewCard = ({ user }) => {
    const [reviews, setReviews] = useState([]);
    {/*
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews/${user._id}`); // Replace "/api/reviews" with the actual API endpoint for fetching reviews
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [user._id]);
*/}
    return (
        <Card>
            <CardHeader
                avatar={<Avatar src={user?.avatar?.url || "/images/no-avatar.jpg"} />}
                subheader={`${user?.email}`}
                title={`${user?.profile?.firstName} ${user?.profile?.lastName}`}
            />
            <CardContent sx={{ paddingY: 1, height: "200px", width: "500px", overflowY: "auto" }}>
                {reviews.length === 0 ? (
                    <Typography variant="body1">No reviews available.</Typography>
                ) : (
                    reviews.map((review, index) => (
                        <Typography key={index} variant="body2">
                            {review.message}
                        </Typography>
                    ))
                )}
            </CardContent>
        </Card>
    );
};

ReviewCard.propTypes = {
    user: PropTypes.object.isRequired,
    onMatch: PropTypes.func.isRequired,
    onUnmatch: PropTypes.func.isRequired,
};

export default dynamic(() => Promise.resolve(ReviewCard), {
    ssr: false,
});
