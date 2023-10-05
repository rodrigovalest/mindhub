import PreviewPost from "../shared/PreviewPost";

const PreviewPostSection = () => {
  return (
    <div className="flex justify-center">
      <div className="my-10 w-2/3">
        <PreviewPost />
        <PreviewPost />
        <PreviewPost />
      </div>
    </div>
  );
}

export default PreviewPostSection;
