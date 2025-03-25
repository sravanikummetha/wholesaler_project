import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useMsal } from "@azure/msal-react";
import ReusableButton from "../common/reusableButton";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401) {
          instance.logoutPopup();
          return;
        }

        const data = await response.json();
        setUserName(data.user?.name || "User");
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await instance.logoutPopup();
      localStorage.removeItem("authToken");
      navigate("/");
      window.location.href = "/";
    } catch (error) {
      alert("Logout failed. Please try again!");
    }
  };

  return (
    <AppBar position="fixed" className={styles.header}>
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6" className={styles.logo}>
          Wholesaler Portal
        </Typography>

        <ReusableButton
          label="Logout"
          onClick={handleLogout}
          className={styles.authButton}
          icon={<LogoutIcon />}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
