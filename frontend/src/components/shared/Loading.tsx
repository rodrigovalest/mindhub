const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin inline-flex w-10 h-10 border-t-2 border-l-2 border-indigo-600 rounded-full shadow-lg">
        <span className="sr-only"></span>
      </div>
      <div className="text-indigo-600 text-xl ml-5">Loading...</div>
    </div>
  );
}

export default Loading;
