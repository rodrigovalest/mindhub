import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import useFetchBackend from "../../hooks/useFetchBackend";
import InputSubmit from "../../components/auth/InputSubmit";
import InputType from "../../components/auth/InputType";
import Logo from "../../components/shared/Logo";

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(3)
    .max(255)
    .required("Username is required"),
  password: yup
    .string()
    .min(5)
    .max(255)
    .required("Password is required")
});


export const Signin = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(registerSchema) });
  const fetchData = useFetchBackend({ method: "POST", path: "/auth/signin" });

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      navigate("/");
    }
  }, []);

  const fetchCredentials = async (credentials: any) => {
    const fetchedData = await fetchData(credentials);

    if (fetchedData instanceof Error) {
      localStorage.removeItem("token");
      alert("Invalid credentials. Try again!");
    } else {
      localStorage.setItem("token", fetchedData.data);
      navigate("/");
    }
  };

  return (
    <div className="w-full h-full">
      <nav className="flex justify-between items-center py-2 px-2">
        <Logo />
      </nav>
      <div className="h-5/6 flex justify-center items-center">
        <div className="w-72">
          <h1 className="pb-6 text-4xl font-bold text-white">Sign in</h1>
          <form onSubmit={handleSubmit(fetchCredentials)}>
            <InputType
              type={"text"}
              fieldName={"username"}
              register={register}
              error={errors.username}
            />
            <InputType
              type={"password"}
              fieldName="password"
              register={register}
              error={errors.password}
            />
            <InputSubmit
              text="Sign in"
            />
          </form>
          <Link
            to="/auth/signup"
            className="text-indigo-600 my-2 underline hover:text-indigo-300 hover:cursor-pointer"
          >
            New here?
          </Link>
        </div>
      </div>
    </div>
  );
};
