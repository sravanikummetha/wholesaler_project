import React from "react";
import Header from "./components/header/Header";
import { useIsAuthenticated } from "@azure/msal-react";
import { Login } from "./components/login/Login";
import WholesalerTable from "./components/table/WholesalerTable";

function App() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100vw" }}>
      {!isAuthenticated ? (
        <Login />
      ) : (
        <>
          <Header />
          <main style={{ padding: "20px", marginTop: "80px" }}>
            <WholesalerTable />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
