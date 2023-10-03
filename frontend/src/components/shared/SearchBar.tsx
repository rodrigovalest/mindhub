import SearchIcon from "../../assets/searchIcon.svg";

const SearchBar = () => {
  // Buscar por posts

  return (
    <form className="flex items-center w-52 md:w-1/3 lg:w-1/4">
      <input
        type="text"
        className="h-8 border-indigo-600 border-2 rounded w-full bg-base text-white pl-1 font-light md:w-full"
      />
      <img
        src={SearchIcon}
        alt="Search icon"
        className="h-7 m-2"
      />
    </form>
  );
}

export default SearchBar;
