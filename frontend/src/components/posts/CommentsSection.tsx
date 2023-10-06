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

  return (
    <section className="text-white flex justify-center">
      <div className="w-2/3 mt-12 mb-10">
        {comments.map((comment: ISchemaComment, index: number) => (
          <div className="bg-softbase rounded-md p-4 my-4">
            <Comment key={index} comment={comment} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default CommentSection;
