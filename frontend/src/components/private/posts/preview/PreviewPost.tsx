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
          <h2 className="text-indigo-500 text-2xl font-bold pb-2">
            {post.title}
          </h2>
          <div className="flex justify-between items-center">
            <Link to={`/users/${post.username}`} className="inline-block text-white pr-3 hover:underline">
              {post.username}
            </Link>
            <Link to={`/users/${post.username}`} className="inline-block rounded-full h-12 w-12 bg-indigo-600" />
          </div>
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
