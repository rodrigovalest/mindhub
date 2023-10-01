import Navbar from "../../components/Navbar";
import Logo from "../../components/Logo";
import InputType from "../../components/InputType";
import InputSubmit from "../../components/InputSubmit";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

const registerSchema = yup.object().shape({
  username: yup
    .string("Username field invalid")
    .min(3)
    .max(255)
    .required(),
  password: yup
    .string("Password field invalid")
    .min(5)
    .max(255)
    .required()
});

export default function Signin() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema)
  });

  useEffect(() => {
    if (localStorage.getItem("token") != null)
      navigate("/");
  });

  const onSubmitForm = (credentials) => {
    fetch(`${apiUrl}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message);
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.data);
        navigate("/");
      })
      .catch((err) => {
        localStorage.removeItem("token");
        alert(`Error: ${err.message}`);
      });
  };

  return (
    <div className="w-full h-full">
      <nav className="flex justify-between items-center py-2 px-2">
        <Logo />
      </nav>
      <div className="h-5/6 flex justify-center items-center">
        <div className="w-72">
          <h1 className="pb-6 text-4xl font-bold text-white">Sign in</h1>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <InputType
              type={"text"}
              fieldName="username"
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
  )
}
