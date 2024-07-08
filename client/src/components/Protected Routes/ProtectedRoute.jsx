import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);

  if (!auth.user) {
    return <Navigate to="/login" />;
  }
  if (!auth.user.role === "Admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
