export default function PreviewPost({ title, text }) {
  const truncateText = (text, maxCharacters) => {
    if (text.length <= maxCharacters) return text;
    return text.substring(0, maxCharacters) + "...";
  };

  const truncatedText = truncateText(text, 300);

  return (
    <div className="bg-softbase rounded-xl my-3">
      <h1 className="text-white font-bold text-xl px-5 pt-3 pb-4 truncate">
        {title}
      </h1>
      <p className="text-white font-light px-5 pb-4">
        {truncatedText}
      </p>
    </div>
  );
}
