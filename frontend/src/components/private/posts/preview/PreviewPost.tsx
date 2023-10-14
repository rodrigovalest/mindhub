import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";

interface IPreviewPost {
  post: any,
  key?: any,
}

const PreviewPost = ({ post }: IPreviewPost) => {
  const navigate = useNavigate();
  const truncatedMdText = post.mdText.slice(0, 400);

  return (
    <div onClick={() => navigate(`/posts/${post.id}`)} className="hover:cursor-pointer">
      <div className="bg-softbase rounded-md py-5 my-5 px-6">
        <div className="flex justify-between items-center pb-6">
          <h2 className="flex items-center text-indigo-500 text-2xl font-bold pb-[9px]">
            {post.title}

            <span
              className="text-gray-200 font-light text-[16px] ml-6"
            >
              Sent by

              <Link
                to={`/users/${post.username}`}
                className="bg-indigo-900 rounded-md text-[16px] text-indigo-300 ml-2 px-2 py-[1px] hover:underline hover:cursor-pointer mb-1 font-normal"
              >
                {post.username}
              </Link>
            </span>
          </h2>

          <p className="inline bg-indigo-900 rounded-md text-[13px] text-indigo-300 px-2 py-[4px]">
            {post.category}
          </p>
        </div>
        <div className="bg-lightbase rounded-md px-8 py-1">
          <ReactMarkdown className="renderMd text-white">
            {truncatedMdText}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default PreviewPost;
