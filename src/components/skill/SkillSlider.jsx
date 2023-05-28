import { Box, Button, Typography } from "@mui/material";
import React, { use, useEffect, useRef, useState } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
const SkillSlider = ({ skills }) => {
  const sliderRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleClickLeft = (e) => {
   setScrollPosition(prevPos => prevPos - 100)
  };

  useEffect(() => {
    sliderRef.current.style.transform = `translateX(${scrollPosition}px)`;
  }, [scrollPosition])
  return (
    <Box sx={{ overflow: "hidden", position: "relative" }}>
     <Box
        component="div"
        onClick={handleClickLeft}
        sx={{
          height: "2rem",
          zIndex: 1,
          width: "2rem",
          borderRadius: "50%",
          boxShadow: 2,
          position: "absolute",
          background: (theme) => theme.palette.background.paper,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          left: 10,
          transform: `translateX(-${scrollPosition}px)`,
          transition: 'all 3s ease-out 2s'
        }}
      >
        <ArrowLeftIcon />
      </Box>

      <Box
        ref={sliderRef}
        sx={{
          display: "flex",
          flexDirection: "row",

          width: "auto",
          columnGap: 3,
          justifyContent: "flex-start",
        }}
      >
        {skills.map((skill) => (
          <Box
            sx={{
              paddingX: 3,
              paddingY: 1,
              background: (theme) => theme.palette.primary.main,
            }}
            key={skill}
          >
            <Typography sx={{ whiteSpace: "nowrap" }}>{skill}</Typography>
          </Box>
        ))}
      </Box>
     
    </Box>
  );
};

export default SkillSlider;
