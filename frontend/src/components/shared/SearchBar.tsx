import SearchIcon from "../../assets/searchIcon.svg";

const SearchBar = () => {
  return (
    <form      
      className="flex items-center w-48 sm:w-1/4"
      action="/search"
      method="GET"
    >
      <input
        type="text"
        className="h-8 border-indigo-600 border-2 rounded bg-base text-white pl-1 font-light w-full focus:border-indigo-600 focus:outline-none hover:bg-softbase"
        name="q"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
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
