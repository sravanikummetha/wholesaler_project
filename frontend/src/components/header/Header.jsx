import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import { styles } from "./style";
const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <AppBar position="fixed" sx={styles.container}>
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" component="div" sx={styles.heading}>
          Wholesaler Portal
        </Typography>

        {/* Conditional Rendering of Login/Logout */}
        {!isAuthenticated ? (
          <Button color="inherit" startIcon={<LoginIcon />} onClick={handleAuth}>
            Login
          </Button>
        ) : (
          <>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
            <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleAuth}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
