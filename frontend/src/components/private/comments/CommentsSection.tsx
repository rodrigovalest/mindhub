import useFetchBackend from "../../../hooks/useFetchBackend";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import IComment from "../../../interfaces/IComment";
import Loading from "../../shared/Loading";

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
    setComments(toTreeOfComments(fetchedData.data));
  };

  useEffect(() => {
    fetchComment();
  }, []);

  if (comments === undefined) {
    return <Loading />;
  }

  if (comments.length > 0) {
    return (
      <section className="text-white flex justify-center">
        <div className="w-[50px] mr-4" />
        <div className="mt-8 mb-10 bg-softbase rounded pt-4 pb-8 px-8 w-5/6 sm:w-2/3">
          {comments && comments.map((comment: IComment, index: number) => (
            <Comment key={index} comment={comment} />
          ))}
        </div>
      </section>
    );
  }

  return null;
}

export default CommentSection;
