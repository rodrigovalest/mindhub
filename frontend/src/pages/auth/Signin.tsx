import { useState } from "react";
import { useFetchBackend } from "../../hooks/useFetchBackend";

const user = {
  username: "",
  password: "",
};

export const Signin = () => {
  const [ data, setData ] = useState<string>("");
  const fetchData = useFetchBackend({ method: "POST", path: "auth/signin", body: user });

  const callData = async () => {
    const fetchedData = await fetchData();
    setData(fetchedData);
  }

  return (
    <div className="bg-white">
      <h1>Hello World!</h1>
      <button onClick={callData}>Fetch data</button>
    </div>
  );
}
