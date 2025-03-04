import React from "react";
import { Button } from "@mui/material";

const ReusableButton = ({ label, onClick, disabled, className, icon }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={className}
      startIcon={icon ? icon : null}  
      variant="contained"
    >
      {label}
    </Button>
  );
};

export default ReusableButton;
