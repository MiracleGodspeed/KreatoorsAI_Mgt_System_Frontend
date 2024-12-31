import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // If not authenticated, redirect to login
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
