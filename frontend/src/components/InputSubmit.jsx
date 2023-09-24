export default function InputSubmit({ text }) {
  return (
    <input
      type="submit"
      className="font-light rounded text-white bg-indigo-600 hover:bg-indigo-500 py-2 px-4 w-full my-2"
      placeholder={text}
    />
  );
}
