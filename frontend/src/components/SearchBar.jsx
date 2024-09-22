import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full flex">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Tracking Number"
          className="border p-2 rounded-l w-5/6 mr-5"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-6 py-2 rounded-r w-2/5"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
