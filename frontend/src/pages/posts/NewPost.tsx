import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useFetchBackend from "../../hooks/useFetchBackend";

import Navbar from "../../components/shared/Navbar";
import MdEditor from "../../components/shared/MdEditor";
import PostCategoriesSelect from "../../components/private/posts/PostCategoriesSelect";
import Button from "../../components/shared/Button";

export const NewPost = () => {
  const navigate = useNavigate();
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState("");
  const fetchData = useFetchBackend({ method: "POST", path: "/posts" });

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
  };

  const submitNewPost = async () => {
    const newPost = {
      "title": title,
      "mdText": text,
      "category": category
    }

    const fetchedData = await fetchData(newPost);

    if (fetchedData instanceof Error) {
      alert("Something went wrong. Try again!");
    } else {
      alert("Post successfully done!");
      navigate("/");
    }
  }

  return (
    <div className="w-full h-full">
      <Navbar />

      <section className="flex justify-center mt-20">
        <div className="bg-softbase w-5/6 md:w-2/3 p-10 pb-4 rounded-lg">
          <div className="flex justify-between items-center">
            <input
              type="text"
              className="my-2 mr-2 rounded-md px-2 py-0.5 h-8 w-11/12"
              placeholder="Insert post title..."
              name="title"
              onChange={onTitleChange}
            />
            <PostCategoriesSelect 
              className="h-8 px-2"
              setState={setCategory}
            />
          </div>
          <MdEditor state={text} setState={setText} />
          <Button 
            text="Post" 
            className="w-40 mt-6 mb-2"
            onClick={submitNewPost}
          />
        </div>
      </section>
    </div>
  );
}
