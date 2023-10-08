import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode } from "react";

import useFetchBackend from "./hooks/useFetchBackend";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const navigate = useNavigate();
  const fetchData = useFetchBackend({ method: "GET", path: "/auth/validate" });

  const fetchValidate = async () => {
    const fetchedData = await fetchData(null);

    if (fetchedData instanceof Error) {
      localStorage.removeItem("token");
      navigate("/auth/signin");
    }
  };

  useEffect(() => {
    fetchValidate();
  }, []);

  return <>{children}</>;
};
