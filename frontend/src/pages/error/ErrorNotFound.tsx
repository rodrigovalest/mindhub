import { Link } from "react-router-dom";

import ThereIsNothingWeCanDo from "../../assets/thereisnothingwecando.jpg";

export const ErrorNotFound = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="text-center w-96">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <p className="text-white text-xl pt-5">
          I'm sorry, but this page doesn't exist
        </p>
        <img 
          src={ThereIsNothingWeCanDo} 
          alt="Napoleon Bonapart meme" 
          className="w-full py-5"
        />
        <Link to="/"
          className="text-white underline hover:cursor-pointer"
        >
          Get back to the homepage
        </Link>
      </div>
    </div>
  );
}
