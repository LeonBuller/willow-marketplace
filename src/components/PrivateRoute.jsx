import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

// When the route is called checks first if the used ISNT logged in; if it's true then navigate to whatever inside the children which in out case it's to the profile,
// Else: navigate to the sign-in
const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    <h3>Loading...</h3>;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;