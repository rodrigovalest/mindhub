import { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

import useFetchBackend from "../hooks/useFetchBackend";

interface IUsernameContext {
  username: string | null,
}

const UsernameContext = createContext<IUsernameContext> ({} as IUsernameContext);

const UsernameContextProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const fetchData = useFetchBackend({ method: "GET", path: "/user" });

  const fetchUserData = async () => {
    const fetchedData = await fetchData(null);

    if (fetchedData instanceof Error) {
      alert("Invalid token!");
      localStorage.removeItem("token");
      navigate("/auth/signin");
    } else {
      setUsername(fetchedData.data.username);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UsernameContext.Provider value={{ username: username }}>
      {children}
    </UsernameContext.Provider>
  );
}

export { UsernameContextProvider };
export default UsernameContext;
