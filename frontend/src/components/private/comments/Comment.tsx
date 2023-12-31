import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { useState } from "react";
import MdEditor from "../../shared/MdEditor";

import useFetchBackend from "../../../hooks/useFetchBackend";
import Button from "../../shared/Button";
import IComment from "../../../interfaces/IComment";
import CommentLikeButtons from "./CommentLikeButtons";

interface IPropsComment {
  key?: number,
  className?: string,
  comment: IComment,
}

const Comment = ({ comment, className }: IPropsComment) => {
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
      <div className="flex pt-8 w-full">
        <div className="flex flex-col">
          <CommentLikeButtons comment={comment} />

          <div className="w-[1px] ml-[38%] mt-[10px] bg-gray-300 h-full" />
        </div>

        <div className="w-full mt-[8px]">
          <Link
            to={`/users/${comment.username}`}
            className="bg-indigo-900 rounded-md text-indigo-300 px-2 py-[3px] hover:underline hover:cursor-pointer"
          >
            {comment.username}
          </Link>

          <ReactMarkdown className="renderMd text-white">{comment.mdText}</ReactMarkdown>

          <div>
            {!isCommenting && (
              <Button text="Comment" className="mt-0" onClick={() => setIsCommenting(true)} />
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
