import PreviewPost from "./PreviewPost";
import { useEffect, useState } from "react";

import useFetchBackend from "../../../../hooks/useFetchBackend";
import IPost from "../../../../interfaces/IPost";
import Container from "../../../shared/Container";
import Loading from "../../../shared/Loading";

const PreviewPostSection = () => {
  const fetchData = useFetchBackend({ method: "GET", path: "/posts" });
  const [posts, setPosts] = useState<IPost[] | undefined>();

  const fetchPosts = async () => {
    const fetchedPosts = await fetchData(null);
    setPosts(fetchedPosts.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (posts === undefined) {
    return <Loading />;
  }

  if (posts.length === 0) {
    return (
      <Container>
        <p className="text-white">No posts found</p>
      </Container>
    );
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
