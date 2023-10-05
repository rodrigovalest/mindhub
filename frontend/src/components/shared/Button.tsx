interface IButton {
  text: string,
  className?: string | undefined,
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
}

const Button = ({ text, className, onClick }: IButton) => {
  return (
    <button
      className={`font-light rounded text-white bg-indigo-600 hover:bg-indigo-500 py-2 px-4 mt-5 mb-2 hover:cursor-pointer ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
