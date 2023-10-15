import ReactMarkdown from "react-markdown";

import useFetchBackend from "../../../hooks/useFetchBackend";
import { useState, useEffect } from "react";

import Button from "../../shared/Button";
import MdEditor from "../../shared/MdEditor";
import LikeButtons from "./PostLikeButtons";
import PostHeader from "./PostHeader";
import IPost from "../../../interfaces/IPost";

interface IPropsPostSection {
  post: IPost
}

const PostSection = ({ post }: IPropsPostSection) => {
  const [postLoaded, setPostLoaded] = useState<boolean>(false);

  const fetchComment = useFetchBackend({ method: "POST", path: `/comments` });
  const [commentText, setCommentText] = useState<string>("");
  const [isCommenting, setIsCommenting] = useState<boolean>(false);

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

  useEffect(() => {
    setPostLoaded(true);
  }, []);

  if (!postLoaded) {
    return null;
  }

  return (
    <section className="mt-[50px]">
      <div className="flex justify-center">
        <LikeButtons post={post} />
        <PostHeader post={post} />
      </div>
      <div className="flex justify-center mt-4 mb-4">
        <div className="w-[50px] mr-4" />
        <div className="bg-softbase rounded-md w-5/6 sm:w-2/3 py-5 px-6">
          <ReactMarkdown className="renderMd text-white">
            {post.mdText}
          </ReactMarkdown>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-[50px] mr-4" />
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

export default PostSection;
