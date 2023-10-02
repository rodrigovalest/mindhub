import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Signin } from "./pages/auth/Signin";
import { Signup } from "./pages/auth/Signup";
import { Signout } from "./pages/auth/Signout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/signout" element={<Signout />} />
      </Routes>
    </BrowserRouter>
  );
}
