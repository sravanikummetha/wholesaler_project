import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "9dfc472b-fa8d-44ad-8e1c-2f9985eb66ca",
    authority:
      "https://login.microsoftonline.com/927e65b8-7ad7-48db-a3c6-c42a67c100d6",
    redirectUri: "http://localhost:5173/",
  },
  cache: {
    cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

export const loginRequest = {
  scopes: ["openId", "profile", "User.Read"],
};

export const tokenRequest = {
  scopes: ["Mail.Read"],
  forceRefresh: false,
};

export const msalInstance = new PublicClientApplication(msalConfig);
