import React, { useState } from "react";

function Search({ setCity }) {
  const [focus, setFocus] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  const handleSearch = () => {
    if (searchItem.trim() !== "") {
      setCity(searchItem);
    }
  };

  return (
    <div
      className={`lg:w-1/2 sm:w-4/5 flex justify-between items-center ${
        !focus ? "border-b border-slate-300" : "border-none"
      }`}
      onClick={() => setFocus(true)}
    >
      <input
        type="text"
        name="search"
        value={searchItem}
        placeholder="شهری را جستجو کنید..."
        className={`w-full h-full outline-none py-2 px-4 rounded-s-md  ${
          focus ? "bg-white/30" : "bg-transparent"
        }`}
        onChange={(e) => setSearchItem(e.target.value)}
      />
      <button
        className={`border-none outline-none py-2 px-4 rounded-e-md text-white ${
          focus
            ? "opacity-100 visible bg-cyan-700 transition duration-75 hover:bg-cyan-800"
            : "opacity-0 hidden bg-transparent"
        }`}
        onClick={handleSearch}
      >
        جستجو
      </button>
    </div>
  );
}

export default Search;
