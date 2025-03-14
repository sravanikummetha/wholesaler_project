import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const ReusableModal = ({ open, handleClose, title, children, onSubmit }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        {children}
        <Button
          onClick={onSubmit}
          variant="contained"
          color="success"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

// Modal Styling
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

export default ReusableModal;
