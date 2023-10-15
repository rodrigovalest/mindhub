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

export const SearchPostsByUserSection = () => {
  const fetchData = useFetchBackend({ method: "GET", path: `/posts${window.location.pathname}` });
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
      <h1 className="pb-6 text-4xl font-bold text-indigo-600">
        {window.location.pathname.replace(/^\/users\//, '')}
      </h1>
      {posts.length > 0 && (
        <div>
          {posts.map((post: any, key: number) => (
            <PreviewPost post={post} key={key} />
          ))}
        </div>
      )}
      {posts.length === 0 && (
        <div>
          <h1 className="pb-6 text-white">It seems like there's nothing here</h1>
        </div>
      )}
    </Container>
  );
}
