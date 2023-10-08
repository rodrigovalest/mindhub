import useFetchBackend from "../../hooks/useFetchBackend";
import { useEffect, useState } from "react";
import Comment from "../shared/Comment";

export interface ISchemaComment {
  id: string;
  userId: string;
  username: string;
  postId: string;
  mdText: string,
  parentCommentId: string | null;
  children?: ISchemaComment[];
}

const toTreeOfComments = (comments: ISchemaComment[]) => {
  const searchParentComment = (parentCommentId: string): ISchemaComment | null => {
    for (const comment of comments) {
      if (comment.id === parentCommentId) {
        return comment;
      }
    }
    return null;
  }

  const rootComments: ISchemaComment[] = [];

  comments.forEach((comment: ISchemaComment) => {
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
  const [comments, setComments] = useState<ISchemaComment[]>([]);

  const fetchComment = async () => {
    const fetchedData = await fetchData(null);

    if (fetchedData instanceof Error) {
      alert("Comments loading failed, went wrong!");
    } else {
      setComments(toTreeOfComments(fetchedData.data));
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  console.log(comments.length);

  if (comments.length > 0) {
    return (
      <section className="text-white flex justify-center">
        <div className="mt-8 mb-10 bg-softbase rounded pt-4 pb-8 px-8 w-5/6 sm:w-2/3">
          {comments && comments.map((comment: ISchemaComment, index: number) => (
            <Comment key={index} comment={comment} />
          ))}
        </div>
      </section>
    );
  }

  return null;
}

export default CommentSection;
