import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";

import useFetchBackend from "../../hooks/useFetchBackend";
import { useEffect, useState } from "react";

const ViewPostSection = () => {
  const navigate = useNavigate();
  const fetchData = useFetchBackend({ method: "GET", path: `${window.location.pathname}` });
  const [post, setPost] = useState<any>("");

  const fetchPost = async () => {
    const fetchedData = await fetchData(null);

    if (fetchedData instanceof Error) {
      alert("Something, went wrong!");
      navigate("/");
    } else {
      setPost(fetchedData.data);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <section className="flex justify-center">
      <div className="w-2/3 mt-12 mb-10">
        <div className="flex justify-between items-center pb-6">
          <h2 className="text-indigo-500 text-2xl font-bold pb-2">
            {post.title}
          </h2>
          <div className="flex justify-between items-center">
            <Link
              to={`/profile/${post.userId}`}
              className="inline-block text-white pr-3 hover:underline"
            >
              username
            </Link>
            <Link
              to={`/profile/${post.userId}`}
              className="inline-block rounded-full h-12 w-12 bg-indigo-600"
            >

            </Link>
          </div>
        </div>

        <div className="bg-softbase rounded-md py-5 mb-5 px-6">
          <ReactMarkdown className="renderMd text-white">
            {post.mdText}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  );
}

export default ViewPostSection;
