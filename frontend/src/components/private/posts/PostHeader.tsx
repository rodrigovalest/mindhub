interface IPostHeader {
  post: any,
}

const PostHeader = ({ post }: IPostHeader) => {
  return (
    <div className="w-5/6 sm:w-2/3">
      <div className="flex items-center mb-8">
        <h2 className="inline-block text-indigo-500 text-4xl font-bold mr-5">
          {post.title}
        </h2>
        <p className="inline-block text-gray-300 text-[16px]">
          sent by
          <span className="bg-indigo-900 rounded-md text-indigo-300 ml-2 px-2 py-[3px] hover:underline hover:cursor-pointer">
            {post.username}
          </span>
        </p>
      </div>

      <p className="inline bg-indigo-700 rounded-md text-[13px] text-gray-300 px-2 py-[4px]">
        {post.category}
      </p>
    </div>
  );
}

export default PostHeader;
