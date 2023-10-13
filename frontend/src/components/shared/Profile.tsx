import { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UsernameContextProvider";

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
    <div ref={cardRef}>
      <div
        className="block rounded-full h-14 w-14 bg-indigo-600 mx-4 hover:cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />

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
