import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import IPost from "../../../../interfaces/IPost";

interface IPropsPreviewPost {
  post: IPost;
  key?: any;
}

const PreviewPost = ({ post }: IPropsPreviewPost) => {
  const navigate = useNavigate();
  const truncatedMdText = post.mdText.slice(0, 400);

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={() => navigate(`/posts/${post.id}`)}
      className="bg-softbase rounded-md py-[18px] my-5 px-[22px] hover:cursor-pointer border border-transparent hover:border-neutral-700"
    >
      <div className="flex justify-between pb-5 max-w-[100%]">
        <h2 className="inline-block text-indigo-500 text-[26px] font-bold break-all">
          {post.title}
        </h2>
      </div>

      <div className="md:flex md:justify-between items-center pb-[26px]">
        <span className="block md:inline-block text-gray-200 font-light text-[16px] mb-3 md:mb-0">
          Sent by
          <Link
            to={`/users/${post.username}`}
            className="bg-indigo-900 rounded-md text-[16px] text-indigo-300 ml-2 px-2 py-[2px] hover:underline hover:cursor-pointer font-normal"
            onClick={handleLinkClick}
          >
            {post.username}
          </Link>
        </span>

        <span className="md:inline-block bg-indigo-900 rounded-md text-[13px] text-indigo-300 px-2 py-[3px] md:ml-3">
          {post.category}
        </span>
      </div>

      <div className="bg-lightbase rounded-md px-8 py-1">
        <ReactMarkdown className="renderMd text-white break-all">
          {truncatedMdText}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default PreviewPost;
