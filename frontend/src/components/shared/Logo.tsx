import Icon from "../../assets/icon.png";

const Logo = () => {
  return (
    <div className="sm:inline-flex sm:items-center px-1 py-3">
      <img src={ Icon } alt="Book icon" className="h-12" />
      <h1 className="text-xl font-bold text-white hidden sm:block hover:text-gray-200">MindHub</h1>
    </div>
  )
}

export default Logo;
