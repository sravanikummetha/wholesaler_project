import React, { useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authconfig";
import ReusableButton from "../common/ReusableButton";
import styles from "./Header.module.css";
import DropdownMenu from "../common/dropdown/DropdownMenu";

const Header = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    console.log("Selected Role:", role);
  };

  const handleLogin = async () => {
    try {
      await instance.loginPopup(loginRequest);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    try {
      await instance.logoutPopup();
    } catch (error) {
      console.error("Logout failed", error);
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
          onClick={() => console.log("Approve clicked")}
          className={styles.approveButton}
        />
        <DropdownMenu options={["Admin", "Customer"]} onSelect={handleRoleSelect} />
      </div>
    </>
  );
};

export default Header;