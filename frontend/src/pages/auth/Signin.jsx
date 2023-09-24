import Logo from "../../components/Logo";
import InputText from "../../components/InputText";
import Buttom from "../../components/Buttom";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full">
      <nav>
        <Logo />
      </nav>
      <div className="h-5/6 flex justify-center items-center">
        <div className="w-72">
          <h1 className="pb-6 text-4xl font-bold text-white">Sign in</h1>
          <InputText text="Username" />
          <InputText text="Password" />
          <Buttom text="Sign in" />
          <p className="text-indigo-600 my-2">New here? 
            <a
              className="text-indigo-600 my-2 underline hover:text-indigo-300 pl-1 hover:cursor-pointer"
              onClick={() => navigate("/auth/signup")}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
