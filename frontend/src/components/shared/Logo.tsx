import Icon from "../../assets/icon.png";

const Logo = () => {
  return (
    <div className="inline-flex items-center px-1 sm:px-4 pt-3 pb-4">
      <img src={ Icon } alt="Book icon" className="h-12" />
      <h1 className="text-xl font-bold text-white">Study forum</h1>
    </div>
  )
}

export default Logo;
