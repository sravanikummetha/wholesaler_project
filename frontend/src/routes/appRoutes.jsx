import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/login/Login";
import WholesalerTable from "../components/table/WholesalerTable";
import Header from "../components/header/Header";

const AppRoutes = () => {
  const token = localStorage.getItem("authToken");

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/wholesalers"
        element={
          token ? (
            <>
              <Header />
              <WholesalerTable />
            </>
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  );
};

export default AppRoutes;
