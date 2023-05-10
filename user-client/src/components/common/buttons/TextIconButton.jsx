import React, { useEffect } from "react";
import { Button, Typography } from "@mui/material";
const TextIconButton = ({ bg, bgHover,  text, icon, onClick, variant, color }) => {
  useEffect(() => {
    icon?.props?.sx?.color
  },[color])
  return (
    <Button
      sx={{
       
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1.5,
        background: bg,
        ":hover": {
            background: bgHover || bg,
          },
        
      }}
     
      variant={ variant || "contained"}
      // color={bg}
      onClick={onClick}
    >
      {React.cloneElement(icon, {sx: {color: color}})}
      <Typography color={color}>{text}</Typography>
    </Button>
  );
};

export default TextIconButton;
