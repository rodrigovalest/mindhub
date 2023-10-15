import { Link } from "react-router-dom";

import Logo from "./Logo";
import Profile from "./Profile";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-2 px-4">
      <div className="flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>
        <Link to="/posts/new" className="text-white hover:text-gray-200 pl-6">New post</Link>
      </div>
      <SearchBar />
      <Profile />
    </nav>
  );
}

export default Navbar;
