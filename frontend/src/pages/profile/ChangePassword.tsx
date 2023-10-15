import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Navbar from "../../components/shared/Navbar";
import InputType from "../../components/private/auth/InputType";
import InputSubmit from "../../components/private/auth/InputSubmit";
import useFetchBackend from "../../hooks/useFetchBackend";

const credentialsSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(5)
    .max(255)
    .required("New password is required"),
  oldPassword: yup
    .string()
    .min(5)
    .max(255)
    .required("Old password is required")
});

export const ChangePassword = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(credentialsSchema) });
  const fetchChanges = useFetchBackend({ method: "PUT", path: "/user/change/password" });

  const fetchCredentials = async (credentials: any) => {
    const fetchedData = await fetchChanges(credentials);

    if (fetchedData instanceof Error) {
      alert(fetchedData.message);
    } else {
      alert("Profile successfully changed");
      navigate("/");
    }
  };

  return (
    <div className="w-full h-full">
      <Navbar />

      <div className="flex justify-center">
        <div className="mb-10 mt-32 w-5/6 sm:w-2/5">
          <h1 className="pb-6 text-4xl font-bold text-white">Change password</h1>
          <form onSubmit={handleSubmit(fetchCredentials)} className="pb-2">
            <InputType
              type="password"
              fieldName="newPassword"
              register={register}
              error={errors.newPassword}
            />
            <InputType
              type="password"
              fieldName="oldPassword"
              register={register}
              error={errors.oldPassword}
            />
            <InputSubmit
              text="Save changes"
            />
          </form>
          <Link
            to="/profile"
            className="text-indigo-500 my-4 underline hover:text-indigo-300 hover:cursor-pointer"
          >
            Change username and email
          </Link>
        </div>
      </div>
    </div>
  );
}
