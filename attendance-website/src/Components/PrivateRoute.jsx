import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("userData");

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const userRole = JSON.parse(userData).role;
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/" />;
    }

    return <Component />;
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
