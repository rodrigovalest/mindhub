import { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

import useFetchBackend from "../hooks/useFetchBackend";

const UsernameContext = createContext<string | null> (null);

const UsernameContextProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>("");
  const fetchData = useFetchBackend({ method: "GET", path: "/user" });

  const fetchUserData = async () => {
    const fetchedData = await fetchData(null);

    if (fetchedData instanceof Error) {
      alert("Invalid token!");
      localStorage.removeItem("token");
      setUsername(null);
      navigate("/auth/signin");
    } else {
      setUsername(fetchedData.data.username);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UsernameContext.Provider value={username}>
      {children}
    </UsernameContext.Provider>
  );
}

export { UsernameContextProvider };
export default UsernameContext;
