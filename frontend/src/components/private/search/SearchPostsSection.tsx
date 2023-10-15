import { useState, useEffect } from "react";

import useFetchBackend from "../../../hooks/useFetchBackend";
import PreviewPost from "../posts/preview/PreviewPost";
import Container from "../../shared/Container";

interface Post {
  id: string,
  userId: string,
  title: string,
  mdText: string,
  category: string,
  username: string,
}

export const SearchPostsSection = () => {
  const fetchData = useFetchBackend({ method: "GET", path: `/posts${window.location.pathname}${window.location.search}` });
  const [posts, setPosts] = useState<Post[]>([]);

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

  return (
    <Container>
      {posts.length > 0 && (
        <div>
          <h1 className="pb-6 text-4xl font-bold text-indigo-600">Search results</h1>
          {posts.map((post: any, key: number) => (
            <PreviewPost post={post} key={key} />
          ))}
        </div>
      )}
      {posts.length === 0 && (
        <div>
          <h1 className="pb-6 text-4xl font-bold text-indigo-600">No results found</h1>
        </div>
      )}
    </Container>
  );
}
