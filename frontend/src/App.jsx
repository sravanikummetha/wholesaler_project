import React from "react";
import Header from "./components/header/header";
import { useIsAuthenticated } from "@azure/msal-react";
import { Login } from "./components/login/login";
import WholesalerTable from "./components/table/wholesalerTable";
import "./App.css";

function App() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="appContainer">
      {!isAuthenticated ? (
        <Login />
      ) : (
        <>
          <Header />
          <main className="mainContent">
            <WholesalerTable />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
