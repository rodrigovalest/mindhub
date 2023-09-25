import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PrivateRoute({ children }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [isTokenValid, setIsTokenValid] = useState(null);

  useEffect(() => {
    validateToken();
  }, []);

  const validateToken = () => {
    fetch(`${apiUrl}/auth/validate`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok)
          throw new Error(`Error. HTTP Status: ${res.status}`);
        setIsTokenValid(true);
      })
      .catch((err) => {
        setIsTokenValid(false);
        navigate("/auth/signin");
      });
  };

  if (isTokenValid) return children;
  else return null;
}
