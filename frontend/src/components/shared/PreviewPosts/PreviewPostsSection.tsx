import PreviewPost from "./PreviewPost";
import { useEffect, useState } from "react";

import useFetchBackend from "../../../hooks/useFetchBackend";

interface Post {
  id: string,
  userId: string,
  title: string,
  mdText: string, 
  category: string,
}

const PreviewPostSection = () => {
  const fetchData = useFetchBackend({ method: "GET", path: "/posts" });
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const fetchedPosts = await fetchData(null);
    console.log(fetchedPosts);

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
    <div className="flex justify-center">
      <div className="my-10 w-2/3">
        {posts.map((post: any, key: number) => (
          <PreviewPost post={post} key={key} />
        ))}
      </div>
    </div>
  );
}

export default PreviewPostSection;
