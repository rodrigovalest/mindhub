import ReactMarkdown from "react-markdown";
import { IComment } from "../posts/CommentsSection";

interface PropsComment {
  key?: number,
  comment: IComment,
}

const Comment = ({ comment }: PropsComment) => {
  return (
    <div key={comment.id}>
      <p>ID: {comment.id}</p>
      <p>User ID: {comment.userId}</p>
      <p>Username: {comment.username}</p>
      <p>Post ID: {comment.postId}</p>
      <ReactMarkdown>{comment.mdText}</ReactMarkdown>
      <p>Parent Comment ID: {comment.parentCommentId}</p>

      {comment.children && comment.children.length > 0 && (
        <div style={{ marginLeft: '20px' }}>
          {comment.children.map((childComment, index) => (
            <Comment key={index} comment={childComment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
