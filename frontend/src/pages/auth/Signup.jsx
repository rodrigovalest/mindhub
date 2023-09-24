import Logo from "../../components/Logo";
import InputText from "../../components/InputText";
import Buttom from "../../components/Buttom";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate("");

  return (
    <div className="w-full h-full">
      <nav>
        <Logo />
      </nav>
      <div className="h-5/6 flex justify-center items-center">
        <div className="w-72">
          <h1 className="pb-6 text-4xl font-bold text-white">Sign up</h1>
          <InputText text="Username" />
          <InputText text="Email" />
          <InputText text="Password" />
          <Buttom text="Create account" />
          <a
            className="text-indigo-600 my-2 underline hover:text-indigo-300"
            href="#"
            onClick={() => navigate("/auth/signin")}
          >
            Already have an account?
          </a>
        </div>
      </div>
    </div>
  );
}
