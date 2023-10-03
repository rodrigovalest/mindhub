import { Navigate } from "react-router-dom";

export const Signout = () => {
  localStorage.removeItem("token");

  return (
    <Navigate to="/auth/signin" />
  );
}
