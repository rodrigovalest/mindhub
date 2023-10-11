import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode, useState } from "react";

import useFetchBackend from "./hooks/useFetchBackend";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const navigate = useNavigate();
  const fetchData = useFetchBackend({ method: "GET", path: "/auth/validate" });
  const [isValid, setIsValid] = useState<boolean>(false);

  const fetchValidate = async () => {
    const fetchedData = await fetchData(null);

    if (fetchedData instanceof Error) {
      localStorage.removeItem("token");
      setIsValid(false);
      navigate("/auth/signin");
    } else {
      setIsValid(true);
    }
  };

  useEffect(() => {
    fetchValidate();
  }, []);

  if (isValid) {
    return <>{children}</>
  } else {
    return null;
  }
};
