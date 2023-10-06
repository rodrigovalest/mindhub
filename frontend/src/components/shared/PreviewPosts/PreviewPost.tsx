import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

interface IPreviewPost {
  post: any,
  key?: any,
}

const PreviewPost = ({ post }: IPreviewPost) => {
  const truncatedMdText = post.mdText.slice(0, 400);

  return (
    <Link to={`/posts/${post.id}`}>
      <div className="bg-softbase rounded-md py-5 my-5 px-6">
        <div className="flex justify-between items-center pb-6">
          <h2 className="text-indigo-500 text-2xl font-bold pb-2">
            {post.title}
          </h2>
          <div className="flex justify-between items-center">
            <Link to={`/profile/${post.userId}`} className="inline-block text-white pr-3 hover:underline">
              username
            </Link>
            <Link to={`/profile/${post.userId}`} className="inline-block rounded-full h-12 w-12 bg-indigo-600">
      
            </Link>
          </div>
        </div>
        <div className="bg-lightbase rounded-md px-8 py-1">
          <ReactMarkdown className="renderMd text-white">
            {truncatedMdText}
          </ReactMarkdown>
        </div>
      </div>
    </Link>
  );
}

export default PreviewPost;
