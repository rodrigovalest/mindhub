import { useNavigate } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";

import useFetchBackend from "./hooks/useFetchBackend";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const navigate = useNavigate();
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const fetchData = useFetchBackend({ method: "GET", path: "auth/validate" });

  useEffect(() => {
    fetchValidate();
  }, []);

  const fetchValidate = async () => {
    const fetchedData = await fetchData(null);

    if (fetchedData instanceof Error) {
      localStorage.removeItem("token");
      console.log(fetchedData);
      setIsTokenValid(false);
    } else {
      console.log(fetchedData);
      setIsTokenValid(true);
    }
  };

  if (isTokenValid === true) {
    return <>{children}</>;
  } else {
    navigate("/auth/signin");
    return null;
  }
};
