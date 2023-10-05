import ReactMarkdown from "react-markdown";

interface IPreviewPost {
  post: any
}

const PreviewPost = ({ post }: IPreviewPost) => {
  const truncatedMdText = post.mdText.slice(0, 500);

  return (
    <div className="bg-softbase rounded-md py-5 my-5 px-6">
      <div className="flex justify-between items-center pb-6">
        <h2 className="text-indigo-500 text-2xl font-bold pb-2">
          {post.title}
        </h2>
        <div className="flex justify-between items-center">
          <p className="inline-block text-white pr-3">
            username
          </p>
          <div className="inline-block rounded-full h-12 w-12 bg-indigo-600">
            
          </div>
        </div>
      </div>
      <div className="bg-lightbase rounded-md px-8 py-1">
        <ReactMarkdown className="renderMd text-white">
          {truncatedMdText}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default PreviewPost;
