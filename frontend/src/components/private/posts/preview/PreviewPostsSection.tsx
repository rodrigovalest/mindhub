import PreviewPost from "./PreviewPost";
import { useEffect, useState } from "react";

import useFetchBackend from "../../../../hooks/useFetchBackend";
import IPost from "../../../../interfaces/IPost";
import Container from "../../../shared/Container";
import Loading from "../../../shared/Loading";

const PreviewPostSection = () => {
  const fetchData = useFetchBackend({ method: "GET", path: "/posts" });
  const [posts, setPosts] = useState<IPost[]>([]);

  const fetchPosts = async () => {
    const fetchedPosts = await fetchData(null);

    if (fetchedPosts instanceof Error) {
      alert("Something went wrong!");
    } else {
      setPosts(fetchedPosts.data);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (posts.length === 0) {
    return <Loading />;
  }

  return (
    <Container>
      {posts.map((post: any, key: number) => (
        <PreviewPost post={post} key={key} />
      ))}
    </Container>
  );
}

export default PreviewPostSection;
