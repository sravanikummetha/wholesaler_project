import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../authConfig";
import styles from "./Login.module.css";
import loginBgImage from "../../assets/login-Image.jpg";
import ReusableButton from "../common/reusableButton";

export const Login = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await instance.loginPopup(loginRequest);
      const account = response.account;
      const tokenResponse = await instance.acquireTokenSilent({
        ...loginRequest,
        account: response.account, // Ensures it retrieves the correct token
      });

      if (!tokenResponse || !tokenResponse.accessToken) {
        console.error("No Access Token received!");
        return;
      }

      const idToken = response.idTokenClaims; // Extract ID token claims
      const userRole = idToken.roles ? idToken.roles[0] : "Customer"; // ✅ Default to "Customer" if no role

      sessionStorage.setItem("authToken", tokenResponse.accessToken);
      sessionStorage.setItem("userName", idToken.name); // Store user name
      sessionStorage.setItem("userEmail", idToken.preferred_username);
      sessionStorage.setItem("userRole", userRole); // Store role in sessionStorage

      localStorage.setItem("authToken", tokenResponse.accessToken);

      navigate("/wholesalers");
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
          className={styles["login-button"]}
        />
      </div>
    </div>
  );
};

export default Login;
