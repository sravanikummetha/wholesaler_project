import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authconfig";
import styles from "./Login.module.css";
import loginBgImage from "../../assets/Login-Image.jpg";
import ReusableButton from "../common/ReusableButton";

export const Login = () => {
    const { instance } = useMsal();

    const handleLogin = async () => {
        try {
            await instance.loginPopup(loginRequest);
        } catch (error) {
            console.error("Login failed", error);
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
                    lassName={styles["login-button"]}
                    sx={{ marginRight: "180px" }}
                />

            </div>
        </div>
    );
};
