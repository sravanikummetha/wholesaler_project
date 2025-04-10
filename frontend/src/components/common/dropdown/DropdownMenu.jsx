import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ReusableButton from "../reusableButton";
import styles from "./dropdownMenu.module.css";

const DropdownMenu = ({ options, onSelect }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    setAnchorEl(null);
    if (option) onSelect(option);
  };

  return (
    <>
      <ReusableButton
        label="Select Role"
        onClick={handleClick}
        icon={
          <ArrowDropDownIcon
            className={`${styles["dropdown-icon"]} ${open ? styles["dropdown-open"] : ""}`}
          />
        }
        className={styles["dropdown-button"]}
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
        PaperProps={{
          className: styles["menu-paper"],
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} onClick={() => handleClose(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DropdownMenu;
