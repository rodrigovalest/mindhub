import useFetchBackend from "../../hooks/useFetchBackend";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/shared/Navbar";
import PostSection from "../../components/private/posts/PostSection";
import CommentSection from "../../components/private/comments/CommentsSection";
import IPost from "../../interfaces/IPost";
import Loading from "../../components/shared/Loading";

export const ViewPost = () => {
  const navigate = useNavigate();
  const fetchPost = useFetchBackend({ method: "GET", path: `${window.location.pathname}` });
  const [post, setPost] = useState<IPost | undefined>();

  useEffect(() => {
    const doFetchPost = async () => {
      const fetchedData = await fetchPost(null);
  
      if (fetchedData instanceof Error) {
        alert("Something, went wrong!");
        navigate("/");
      } else {
        setPost(fetchedData.data);
      }
    };

    doFetchPost();
  }, []);

  if (post === undefined) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <PostSection post={post} />
      <CommentSection />
    </div>
  );
}
