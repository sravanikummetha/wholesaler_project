import React, { useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import ReusableButton from "../common/reusableButton";
import styles from "./Header.module.css";
import DropdownMenu from "../common/dropdown/dropdownMenu";

const Header = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleLogin = async () => {
    try {
      await instance.loginPopup(loginRequest);
    } catch (error) {
      alert("Login failed. Please try again!");
    }
  };

  const handleLogout = async () => {
    try {
      await instance.logoutPopup();
    } catch (error) {
      alert("Login failed. Please try again!");
    }
  };

  return (
    <>
      <AppBar position="fixed" className={styles.header}>
        <Toolbar className={styles.toolbar}>
          {/* Logo */}
          <Typography variant="h6" className={styles.logo}>
            Wholesaler Portal
          </Typography>

          {!isAuthenticated ? (
            <ReusableButton
              label="Login with Azure AD"
              onClick={handleLogin}
              className={styles.authButton}
              icon={<LoginIcon />}
            />
          ) : (
            <ReusableButton
              label="Logout"
              onClick={handleLogout}
              className={styles.authButton}
              icon={<LogoutIcon />}
            />
          )}
        </Toolbar>
      </AppBar>

      <div className={styles.actionContainer}>
        <ReusableButton
          label="Approve"
          onClick={() => alert("Approve clicked")}
          className={styles.approveButton}
        />
        <DropdownMenu
          options={["Admin", "Customer"]}
          onSelect={handleRoleSelect}
        />
      </div>
    </>
  );
};

export default Header;
