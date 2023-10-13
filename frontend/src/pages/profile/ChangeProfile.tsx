import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Navbar from "../../components/shared/Navbar";
import InputType from "../../components/private/auth/InputType";
import InputSubmit from "../../components/private/auth/InputSubmit";
import useFetchBackend from "../../hooks/useFetchBackend";

const credentialsSchema = yup.object().shape({
  username: yup
    .string()
    .min(3)
    .max(255)
    .required("Username is required"),
  email: yup
    .string()
    .email()
    .required("Email is required"),
});

interface IUser {
  username: string,
  email: string,
}

export const ChangeProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>({} as IUser);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(credentialsSchema) });
  const fetchUser = useFetchBackend({ method: "GET", path: "/user" });
  const fetchChanges = useFetchBackend({ method: "PUT", path: "/user/change" });

  const fetchUserData = async () => {
    const fetchedData = await fetchUser(null);

    if (fetchedData instanceof Error) {
      alert("Invalid token!");
      localStorage.removeItem("token");
      navigate("/auth/signin");
    } else {
      setUser(fetchedData.data);
    }
  }

  const fetchCredentials = async (credentials: any) => {
    const fetchedData = await fetchChanges(credentials);

    if (fetchedData instanceof Error) {
      alert(fetchedData.message);
    } else {
      alert("Profile successfully changed");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="w-full h-full">
      <Navbar />

      <div className="flex justify-center">
        <div className="mb-10 mt-32 w-5/6 sm:w-2/5">
          <h1 className="pb-6 text-4xl font-bold text-white">Change profile</h1>
          <form onSubmit={handleSubmit(fetchCredentials)} className="pb-2">
            <InputType
              type="text"
              fieldName="username"
              register={register}
              defaultValue={user.username}
              error={errors.username}
            />
            <InputType
              type="email"
              fieldName="email"
              register={register}
              defaultValue={user.email}
              error={errors.email}
            />
            <InputSubmit
              text="Save changes"
            />
          </form>
          <Link
            to="/profile/password"
            className="text-indigo-500 my-2 underline hover:text-indigo-300 hover:cursor-pointer"
          >
            Change password
          </Link>
        </div>
      </div>
    </div>
  );
}
