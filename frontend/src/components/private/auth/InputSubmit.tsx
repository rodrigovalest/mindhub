interface IPropsInputSubmit {
  text: string
}

const InputSubmit: React.FC<IPropsInputSubmit> = ({ text }) => {
  return (
    <input
      type="submit"
      className="font-light rounded text-white bg-indigo-600 hover:bg-indigo-500 py-2 px-4 w-full my-2 hover:cursor-pointer"
      value={text}
    />
  );
}

export default InputSubmit;

