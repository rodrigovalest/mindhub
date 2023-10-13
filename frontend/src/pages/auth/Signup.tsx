import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import useFetchBackend from "../../hooks/useFetchBackend";
import InputSubmit from "../../components/private/auth/InputSubmit";
import InputType from "../../components/private/auth/InputType";
import Logo from "../../components/shared/Logo";

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(3)
    .max(255)
    .required("Username is required"),
  email: yup
    .string()
    .email()
    .required("Email is required"),
  password: yup
    .string()
    .min(5)
    .max(255)
    .required("Password is required")
});


export const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(registerSchema) });
  const fetchData = useFetchBackend({ method: "POST", path: "/auth/signup" });

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      navigate("/");
    }
  });

  const fetchCredentials = async (credentials: any) => {
    const fetchedData = await fetchData(credentials);

    if (fetchedData instanceof Error) {
      localStorage.removeItem("token");
      alert(fetchedData);
    } else {
      alert("Account sucefully created!");
      navigate("/auth/signin");
    }
  };

  return (
    <div className="w-full h-full">
      <nav className="flex justify-between items-center py-2 px-2">
        <Logo />
      </nav>
      <div className="h-5/6 flex justify-center items-center">
        <div className="w-72">
          <h1 className="pb-6 text-4xl font-bold text-white">Sign up</h1>
          <form onSubmit={handleSubmit(fetchCredentials)}>
            <InputType
              type={"text"}
              fieldName={"username"}
              register={register}
              error={errors.username}
            />
            <InputType
              type={"email"}
              fieldName="email"
              register={register}
              error={errors.email}
            />
            <InputType
              type={"password"}
              fieldName="password"
              register={register}
              error={errors.password}
            />
            <InputSubmit 
              text="Create account" 
            />
          </form>
          <Link
            to="/auth/signin"
            className="text-indigo-600 my-2 underline hover:text-indigo-300 hover:cursor-pointer"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};
