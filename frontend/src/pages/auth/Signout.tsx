import { Navigate } from "react-router-dom";

export default function Signout() {
  localStorage.removeItem("token");

  return (
    <Navigate to="/auth/signin" />
  );
}
