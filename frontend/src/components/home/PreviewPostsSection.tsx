import PreviewPost from "../shared/PreviewPost";
import { useEffect, useState } from "react";

import useFetchBackend from "../../hooks/useFetchBackend";

const PreviewPostSection = () => {
  const fetchData = useFetchBackend({ method: "GET", path: "posts" });
  const [posts, setPosts] = useState<any[]>([]);

  const fetchPosts = async () => {
    const fetchedPosts = await fetchData(null);

    if (fetchedPosts instanceof Error) {
      alert("Something went wrong!");
    } else {
      setPosts(fetchedPosts.data);
    }
  };

  console.log(posts)

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="my-10 w-2/3">
        {posts.map((post: any) => (
          <PreviewPost post={post} />
        ))}
      </div>
    </div>
  );
}

export default PreviewPostSection;
