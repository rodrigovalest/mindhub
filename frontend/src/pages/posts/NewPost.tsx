import { useState } from "react";

import Navbar from "../../components/shared/Navbar";
import MdEditor from "../../components/shared/MdEditor";

export const NewPost = () => {
  const [text, setText] = useState("");

  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="flex justify-center my-20">
        <MdEditor state={text} setState={setText} />   
      </div>
    </div>
  );
}
