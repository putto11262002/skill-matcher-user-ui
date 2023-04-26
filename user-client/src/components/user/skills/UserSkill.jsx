import { Box, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
const UserSkill = ({value,  label, proficiency, size, onClick }) => {
  return (
    <Tooltip title={(onClick && value) ? `View ${value?.skill}` : value?.skill}>
      <Stack
      spacing={0.5}
      component="div"
      onClick={() => onClick && onClick(value)}
      sx={{ cursor: onClick ? "pointer" : "auto" }}
    >
     {label ? label :  <Typography
        variant="caption"
        color={(theme) => theme.palette.text.secondary}
      >
        {value.skill}
      </Typography>}
      <Box
        sx={{
          width: "100%",
          height: "3px",
          borderRadius: 4,
          overflow: "hidden",
          background: (theme) => theme.palette.grey[200],
        }}
      >
        <Box
          sx={{
            width: `${(value?.proficiency / 10) * 100 || 0}%`,
            height: "100%",
            background: (theme) => theme.palette.primary.main,
          }}
        ></Box>
      </Box>
    </Stack>
    </Tooltip>
  );
};

export default UserSkill;
