import ReactMarkdown from "react-markdown";
import { ISchemaComment } from "../posts/CommentsSection";
import { Link } from "react-router-dom";

import Button from "./Button";

interface IComment {
  key?: number,
  className?: string,
  comment: ISchemaComment,
}

const Comment = ({ comment, className }: IComment) => {
  return (
    <>
      <div className="flex justify-start items-center py-5">
        <Link to={`/profile/${comment.userId}`} className="inline-block bg-indigo-600 rounded-full h-10 w-10">

        </Link>
        <Link to={`/profile/${comment.userId}`} className="inline-block text-white pl-4 hover:underline">
          username
        </Link>
      </div>

      <div className="flex">
        <div className="border-e ml-4 w-1"></div>

        <div className={`${className} pl-10 pt-5 w-full`}>
          <ReactMarkdown className="pb-2">{comment.mdText}</ReactMarkdown>
          <Button text="Comment" />

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
