import { Link } from "react-router-dom";

import Logo from "./Logo";
import Profile from "./Profile";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-2 px-2">
      <Link to="/">
        <Logo />
      </Link>
      <SearchBar />
      <div className="flex items-center">
        <Link to="/posts/new" className="text-white">New post</Link>
        <Profile />
      </div>
    </nav>
  );
}

export default Navbar;
