import ReactMarkdown from "react-markdown";
import { ISchemaComment } from "../posts/CommentsSection";
import { Link } from "react-router-dom";
import { useState } from "react";
import MdEditor from "../shared/MdEditor";

import useFetchBackend from "../../hooks/useFetchBackend";
import Button from "./Button";

interface IComment {
  key?: number,
  className?: string,
  comment: ISchemaComment,
}

const Comment = ({ comment, className }: IComment) => {
  const fetchComment = useFetchBackend({ method: "POST", path: `/comments` });
  const [commentText, setCommentText] = useState<string>("");
  const [isCommenting, setIsCommenting] = useState<boolean>(false);

  const doFetchComment = async () => {
    const newComment = {
      postId: comment.postId,
      parentCommentId: comment.id,
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
    <>
      <div className="flex justify-start items-center py-5">
        <Link to={`/users/${comment.username}`} className="inline-block bg-indigo-600 rounded-full h-10 w-10">

        </Link>
        <Link to={`/users/${comment.username}`} className="inline-block text-white pl-4 hover:underline">
          {comment.username}
        </Link>
      </div>

      <div className="flex">
        <div className="border-e ml-4 w-1"></div>

        <div className={`${className} pl-10 pt-5 w-full`}>
          <ReactMarkdown className="renderMd text-white">{comment.mdText}</ReactMarkdown>

          <div className="mb-10">
            {!isCommenting && (
              <Button text="Comment" onClick={() => setIsCommenting(true)} />
            )}
            {isCommenting && (
              <div className="mt-4 text-black">
                <MdEditor state={commentText} setState={setCommentText} />
                <Button text="Cancel" onClick={() => setIsCommenting(false)} className="mr-3" />
                <Button text="Comment" onClick={() => doFetchComment()} className="" />
              </div>
            )}
          </div>

          {comment.children && comment.children.length > 0 && (
            comment.children.map((childComment, index) => (
              <Comment key={index} comment={childComment} className={`${className} pl-10`} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Comment;
