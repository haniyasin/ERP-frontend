import React from "react";
import { Navigate } from "react-router-dom";
import NotFound from "../pages/NotFound";

export const handleUnauthorized = () => {
  return <Navigate to="/unauthorized" replace />;
};

export const handleNotFound = () => {
  return <NotFound />;
};
