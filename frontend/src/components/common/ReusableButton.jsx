import React from "react";
import { Button } from "@mui/material";

const ReusableButton = ({ label, onClick, disabled, className, icon, sx }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={className}
      startIcon={icon ? icon : null}  
      variant="contained"
      sx={sx}
    >
      {label}
    </Button>
  );
};

export default ReusableButton;
