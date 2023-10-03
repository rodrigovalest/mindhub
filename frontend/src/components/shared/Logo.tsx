import Icon from "../../assets/icon.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="inline-flex items-center px-1 sm:px-4 pt-3 pb-4">
      <img src={ Icon } alt="Book icon" className="h-12" />
      <h1 className="text-xl font-bold text-white">Study forum</h1>
    </Link>
  )
}

export default Logo;
