import SearchIcon from "../../assets/searchIcon.svg";

import { useState } from "react";

const SearchBar = () => {
  // Buscar por posts

  return (
    <form

      className="flex items-center w-48 sm:w-1/4"
    >
      <input
        type="text"
        className="h-8 border-indigo-600 border-2 rounded bg-base text-white pl-1 font-light w-full"
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
