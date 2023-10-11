import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import UserContext from "../../contexts/UsernameContextProvider";

const Profile = () => {
  const usernameContextObject = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  // Puxar imagem do usuário do BD
  // Quando clicar fora da caixa, fechá-la

  return (
    <div>
      <div
        className="block rounded-full h-14 w-14 bg-indigo-600 mx-4 hover:cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && usernameContextObject && (
        <div className="absolute right-0 mt-5 mr-8 rounded-md bg-lightbase text-white">
          <div className="px-2 py-2">
            <div className="px-3 py-2 rounded-md hover:bg-softbase">
              <Link to={`/users/${usernameContextObject.username}`}>My posts</Link>
            </div>
            <div className="px-3 py-2 rounded-md hover:bg-softbase">
              <Link to={`/profile`}>Edit profile</Link>
            </div>
          </div>
          <hr />
          <div className="px-2 py-2">
            <div className="px-3 py-2 rounded-md hover:bg-softbase">
              <Link to="/auth/signout">Sign out</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
