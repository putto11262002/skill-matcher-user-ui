import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Card, CardContent, Rating } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Avatar, CardActions, CardHeader, IconButton, Link, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import dynamic from "next/dynamic";

const ReviewCard = ({ review }) => {
    const [reviews, setReviews] = useState([]);

    return (
        <Card>
            <CardHeader
                avatar={<Avatar src={review?.source?.avatar?.url || "/images/no-avatar.jpg"} />}
                subheader={<Rating size="small" readOnly value={review.score}/>}
                title={`${review?.source?.profile?.firstName} ${review?.source?.profile?.lastName}`}
            />
            <CardContent>
             <Typography>{review.message}</Typography>
            </CardContent>
        </Card>
    );
};



export default dynamic(() => Promise.resolve(ReviewCard), {
    ssr: false,
});
