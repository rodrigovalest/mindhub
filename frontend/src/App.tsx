import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";
import { UsernameContextProvider } from "./contexts/UsernameContextProvider";

import { Signin } from "./pages/auth/Signin";
import { Signup } from "./pages/auth/Signup";
import { Signout } from "./pages/auth/Signout";

import { NewPost } from "./pages/posts/NewPost";
import { ViewPost } from "./pages/posts/ViewPost";

import { ChangeProfile } from "./pages/profile/ChangeProfile";

import { ErrorNotFound } from "./pages/error/ErrorNotFound";

import { Home } from "./pages/Home";


export default function App() {
  return (
    <BrowserRouter>
      <UsernameContextProvider>
        <Routes>
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/signout" element={<Signout />} />
          <Route path="/posts/new" element={<PrivateRoute><NewPost /></PrivateRoute>} />
          <Route path="/posts/:id" element={<PrivateRoute><ViewPost /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ChangeProfile /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="*" element={<ErrorNotFound />} />
        </Routes>
      </UsernameContextProvider>
    </BrowserRouter>
  );
}
