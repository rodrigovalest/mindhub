import ReactMarkdown from "react-markdown";

import useFetchBackend from "../../hooks/useFetchBackend";
import { useEffect, useState } from "react";
import Comment from "../shared/Comment";

export interface IComment {
  id: string;
  userId: string;
  username: string;
  postId: string;
  mdText: string,
  parentCommentId: string | null;
  children?: IComment[];
}

const toTreeOfComments = (comments: IComment[]) => {
  const searchParentComment = (parentCommentId: string): IComment | null => {
    for (const comment of comments) {
      if (comment.id === parentCommentId) {
        return comment;
      }
    }
    return null;
  }

  const rootComments: IComment[] = [];

  comments.forEach((comment: IComment) => {
    if (!comment.parentCommentId) {
      rootComments.push(comment);
    } else {
      const parentComment = searchParentComment(comment.parentCommentId);
      if (parentComment) {
        if (!parentComment.children) {
          parentComment.children = [];
        }
        parentComment.children.push(comment);
      }
    }
  });

  return rootComments;
}

const CommentSection = () => {
  const fetchData = useFetchBackend({ method: "GET", path: `/comments?post=${window.location.pathname.split("/")[2]}` });
  const [comments, setComments] = useState<IComment[]>([]);

  const fetchComment = async () => {
    const fetchedData = await fetchData(null);

    if (fetchedData instanceof Error) {
      alert("Comments loading failed, went wrong!");
    } else {
      toTreeOfComments(fetchedData.data);
      setComments(fetchedData.data);
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <div className="text-white">
      {comments.map((comment: IComment, index: number) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
}

export default CommentSection;
