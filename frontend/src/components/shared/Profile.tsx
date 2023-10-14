import { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UsernameContextProvider";
import userIcon from "../../assets/userIcon.svg";
import dropdownArrow from "../../assets/dropdownArrow.svg";

const Profile = () => {
  const usernameContextValue = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={cardRef} className="hover:cursor-pointer">
      <div 
        className="flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-center rounded-full h-12 w-12 mx-4 hover:cursor-pointer p-2 bg-indigo-600">
          <img
            src={userIcon}
            alt="User icon"
            className="bg-indigo-600 rounded-full"
          />
        </div>
        
        <p className="text-white truncate max-w-[200px] hidden sm:block">{usernameContextValue}</p>
        <img
          src={dropdownArrow}
          alt="Dropdown icon"
          className="h-8 pl-3 hidden sm:block"
        />
      </div>

      {isOpen && usernameContextValue && (
        <div className="absolute right-0 mt-5 mr-8 rounded-md bg-lightbase text-white">
          <div className="px-2 py-2">
            <div className="px-3 py-2 rounded-md hover:bg-softbase hover:cursor-pointer">
              <Link to={`/users/${usernameContextValue}`}>My posts</Link>
            </div>
            <div className="px-3 py-2 rounded-md hover:bg-softbase hover:cursor-pointer">
              <Link to={`/profile`}>Edit profile</Link>
            </div>
          </div>
          <hr />
          <div className="px-2 py-2">
            <div className="px-3 py-2 rounded-md hover:bg-softbase hover:cursor-pointer">
              <Link to="/auth/signout">Sign out</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
