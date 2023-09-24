import Icon from "../assets/icon.png";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="inline-flex items-center p-4">
      <img src={Icon} alt="Book icon" className="h-12" />
      <h1 className="text-xl font-bold text-white">Study forum</h1>
    </Link>
  )
}
