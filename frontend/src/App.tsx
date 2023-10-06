import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { ErrorNotFound } from "./pages/error/ErrorNotFound";
import { Signin } from "./pages/auth/Signin";
import { Signup } from "./pages/auth/Signup";
import { Signout } from "./pages/auth/Signout";
import { Home } from "./pages/Home";
import { NewPost } from "./pages/posts/NewPost";
import { ViewPost } from "./pages/posts/ViewPost";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/signout" element={<Signout />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/posts/new" element={<PrivateRoute><NewPost /></PrivateRoute>} />
        <Route path="/posts/:id" element={<PrivateRoute><ViewPost /></PrivateRoute>} />
        <Route path="*" element={<ErrorNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
