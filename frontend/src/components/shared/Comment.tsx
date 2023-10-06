import ReactMarkdown from "react-markdown";
import { ISchemaComment } from "../posts/CommentsSection";

interface IComment {
  key?: number,
  className?: string,
  comment: ISchemaComment,
}

const Comment = ({ comment, className }: IComment) => {
  return (
    <div key={comment.id} className={`${className}`}>
      <ReactMarkdown>{comment.mdText}</ReactMarkdown>

      {comment.children && comment.children.length > 0 && (
        comment.children.map((childComment, index) => (
          <Comment key={index} comment={childComment} className={`${className} pl-4 pt-4`} />
        ))
      )}
    </div>
  );
};

export default Comment;
