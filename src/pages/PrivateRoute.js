import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  let logedIn = false;

  const userStr = sessionStorage.getItem("logedInUser");
  if (userStr) {
    const user = JSON.parse(userStr);
    logedIn = user.id ? true : false;
  }

  return logedIn ? children : <Navigate to="/" />;
};
