import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/user/AuthContext";

export default function PrivateRoute({ ...rest }) {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/" />;
}
