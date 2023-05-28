import React from "react";
import { Box, Tooltip, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
const CircularIconButton = ({ icon, tooltip, onClick }) => {
  return (
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
      <Tooltip title={tooltip}>
        <IconButton onClick={onClick} sx={{ width: "100%", height: "100%" }}>
          {icon}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CircularIconButton;
