import { Link } from "react-router-dom";

import Logo from "./Logo";
import Profile from "./Profile";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-2">
      <div className="flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>
        <Link to="/posts/new" className="text-white hover:underline pl-4">New post</Link>
      </div>
      <SearchBar />
      <Profile />
    </nav>
  );
}

export default Navbar;
