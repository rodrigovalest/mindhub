import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";

import { Signin } from "./pages/auth/Signin";
import { Signup } from "./pages/auth/Signup";
import { Signout } from "./pages/auth/Signout";

import { NewPost } from "./pages/posts/NewPost";
import { ViewPost } from "./pages/posts/ViewPost";

import { ChangeProfile } from "./pages/profile/ChangeProfile";
import { ChangePassword } from "./pages/profile/ChangePassword";

import { SearchPosts } from "./pages/search/SearchPosts";

import { SearchPostsByUser } from "./pages/users/SearchPostsByUser";

import { ErrorNotFound } from "./pages/error/ErrorNotFound";

import { Home } from "./pages/Home";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/posts/new" element={<PrivateRoute><NewPost /></PrivateRoute>} />
        <Route path="/posts/:id" element={<PrivateRoute><ViewPost /></PrivateRoute>} />
        <Route path="/profile/password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ChangeProfile /></PrivateRoute>} />
        <Route path="/search" element={<PrivateRoute><SearchPosts /></PrivateRoute>} />
        <Route path="/users/:username" element={<PrivateRoute><SearchPostsByUser /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      
        <Route path="*" element={<ErrorNotFound />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/signout" element={<Signout />} />
      </Routes>
    </BrowserRouter>
  );
}
