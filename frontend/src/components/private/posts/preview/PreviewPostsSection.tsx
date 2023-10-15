import PreviewPost from "./PreviewPost";
import { useEffect, useState } from "react";

import useFetchBackend from "../../../../hooks/useFetchBackend";
import IPost from "../../../../interfaces/IPost";

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

  return (
    <div className="flex justify-center">
      <div className="my-10 w-5/6 sm:w-2/3">
        {posts.map((post: any, key: number) => (
          <PreviewPost post={post} key={key} />
        ))}
      </div>
    </div>
  );
}

export default PreviewPostSection;
