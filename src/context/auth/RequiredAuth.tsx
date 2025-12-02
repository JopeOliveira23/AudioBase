import { Navigate, Outlet } from "react-router-dom";
import { Auth } from "./auth";

export function RequireAuth() {
  if (!Auth.isLogged()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
