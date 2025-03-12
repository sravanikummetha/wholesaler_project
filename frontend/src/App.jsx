import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import Header from "./components/header/header";
import WholesalerTable from "./components/table/wholesalerTable";
import Login from "./components/login/login";
import AppRoutes from "./routes/appRoutes";
import "./App.css";

function App() {
  const { instance } = useMsal();
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
      fetchProfile(token);
    }
  }, []);

  const fetchProfile = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      setIsAuthenticated(false); // If token is invalid, log out
    }
  };

  return (
    <div className="appContainer">
      <AppRoutes />
      {!isAuthenticated ? (
        <Login setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <>
          <main className="mainContent"></main>
        </>
      )}
    </div>
  );
}

export default App;
