import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import styles from "./Login.module.css";
import loginBgImage from "../../assets/login-Image.jpg";
import ReusableButton from "../common/reusableButton";

export const Login = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      await instance.loginPopup(loginRequest);
    } catch (error) {
      alert("Login failed. Please try again!");
    }
  };

  return (
    <div
      className={styles["login-container"]}
      style={{ backgroundImage: `url(${loginBgImage})` }}
    >
      <div className={styles["login-content"]}>
        <h2 className={styles["login-title"]}>Welcome to Wholesaler Portal</h2>
        <ReusableButton
          label="Login with Portal ID"
          onClick={handleLogin}
          className={styles["login-button"]}
        />
      </div>
    </div>
  );
};
