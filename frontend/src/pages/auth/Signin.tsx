import { useForm } from "react-hook-form";

import useFetchBackend from "../../hooks/useFetchBackend";


export const Signin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const fetchData = useFetchBackend({ method: "POST", path: "auth/signin" });

  const fetchCredentials = async (credentials: any) => {
    const fetchedData = await fetchData(credentials);
  
    if (fetchedData instanceof Error) {
      console.log(fetchedData)
    }

    localStorage.setItem("token", fetchedData.data);
  };

  return (
    <form onSubmit={handleSubmit(fetchCredentials)}>
      <input
        type="text"
        {...register("username")}
      />
      <input
        type="password"
        {...register("password")}
      />
      <input type="submit" />
    </form>
  );
};
