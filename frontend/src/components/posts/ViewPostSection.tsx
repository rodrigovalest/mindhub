import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";

import useFetchBackend from "../../hooks/useFetchBackend";
import { useEffect, useState } from "react";

import Button from "../shared/Button";
import MdEditor from "../shared/MdEditor";

const ViewPostSection = () => {
  const navigate = useNavigate();
  const fetchPost = useFetchBackend({ method: "GET", path: `${window.location.pathname}` });
  const [post, setPost] = useState<any>("");

  const fetchComment = useFetchBackend({ method: "POST", path: `/comments` });
  const [commentText, setCommentText] = useState<string>("");
  const [isCommenting, setIsCommenting] = useState<boolean>(false);

  const doFetchPost = async () => {
    const fetchedData = await fetchPost(null);

    if (fetchedData instanceof Error) {
      alert("Something, went wrong!");
      navigate("/");
    } else {
      setPost(fetchedData.data);
    }
  };

  useEffect(() => {
    doFetchPost();
  }, []);

  const doFetchComment = async () => {
    const newComment = {
      postId: post.id,
      mdText: commentText
    }
    
    const fetchedData = await fetchComment(newComment);

    if (fetchedData instanceof Error) {
      alert("Something went wrong!");
    } else {
      alert("Comment made successfully!");
      window.location.reload();
    }
  }

  return (
    <section>
      <div className="flex justify-center">
        <div className="w-5/6 sm:w-2/3 mt-12 mb-5">
          <div className="flex justify-between items-center pb-6">
            <h2 className="text-indigo-500 text-2xl font-bold pb-2">
              {post.title}
            </h2>
            <div className="flex justify-between items-center">
              <Link
                to={`/profile/${post.userId}`}
                className="inline-block text-white pr-3 hover:underline"
              >
                username
              </Link>
              <Link
                to={`/profile/${post.userId}`}
                className="inline-block rounded-full h-12 w-12 bg-indigo-600"
              >
              </Link>
            </div>
          </div>
          <div className="bg-softbase rounded-md py-5 px-6">
            <ReactMarkdown className="renderMd text-white">
              {post.mdText}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-2/3 mb-10">
          {!isCommenting && (
            <Button text="Comment" onClick={() => setIsCommenting(true)} />
          )}
          {isCommenting && (
            <div>
              <MdEditor state={commentText} setState={setCommentText} />
              <Button text="Cancel" onClick={() => setIsCommenting(false)} className="mr-3" />
              <Button text="Comment" onClick={() => doFetchComment()} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ViewPostSection;
