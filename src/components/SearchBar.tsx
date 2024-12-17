import React, { useState, useEffect, useRef } from "react";

const SearchBar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-bar-container" style={{ position: "relative" }}>
      <div
        className="search-bar"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="searchIcon" style={{ marginRight: "8px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path
              fill="currentColor"
              d="M4.092 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0m6.95-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .79-.79l-3.73-3.73A8.05 8.05 0 0 0 11.042 3z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="searchInput"
          style={{ flex: 1, padding: "8px" }}
        />
        <div className="filterIcon" onClick={toggleDropdown}>
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="black"
          >
            <path d="M1 3.75A.75.75 0 011.75 3h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 3.75zM3.5 7.75A.75.75 0 014.25 7h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM6.75 11a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z" />
          </svg>
        </div>
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="dropdown" ref={dropdownRef}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "8px" }}>
              <label>
                <input type="checkbox" value="Technology" />
                <span>Technology</span>
              </label>
            </li>
            <li style={{ marginBottom: "8px" }}>
              <label>
                <input type="checkbox" value="Science" />
                <span>Science</span>
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" value="Education" />
                <span>Education</span>
              </label>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
