import { useFetch } from "../../hooks/useFetch";

const user = {
  username: "user",
  password: "123mudar",
};

export const Signin = () => {
  const fetchData = useFetch({ method: "POST", path: "auth/signin", body: user });

  const callData = async () => {
    const fetchedData = await fetchData();

    if (fetchedData && fetchedData.data) {
      localStorage.setItem("token", fetchedData.data);
    }
  }

  return (
    <div className="bg-white">
      <h1>Hello World!</h1>
    </div>
  );
}
