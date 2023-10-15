import { Link } from "react-router-dom";
import IPost from "../../../interfaces/IPost";

interface IPropsPostHeader {
  post: IPost,
}

const PostHeader = ({ post }: IPropsPostHeader) => {
  return (
    <div className="w-5/6 sm:w-2/3 mb-[8px]">
      <h2 className="text-indigo-500 text-4xl font-bold mb-5 break-all">
        {post.title}
      </h2>

      <p className="text-gray-200 mb-6 text-[16px]">
        Sent by
        <Link to={`/users/${post.username}`} className="bg-indigo-900 rounded-md text-indigo-300 ml-2 px-2 py-[3px] hover:underline hover:cursor-pointer">
          {post.username}
        </Link>
      </p>

      <p className="inline bg-indigo-900 rounded-md text-[13px] text-indigo-300 px-2 py-[4px]">
        {post.category}
      </p>
    </div>
  );
}

export default PostHeader;
