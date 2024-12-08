import React from "react";
const SearchBar: React.FC = () => {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <div className="searchIcon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path
              fill="currentColor"
              d="M4.092 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0m6.95-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .79-.79l-3.73-3.73A8.05 8.05 0 0 0 11.042 3z"
            />
          </svg>
        </div>
        <input type="text" placeholder="Search" className="searchInput" />
      </div>
    </div>
  );
};

export default SearchBar;
