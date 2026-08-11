import React from "react";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="panel">
      <div className="field">
        <label htmlFor="search-input">Search by Name</label>
        <input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Type a name..."
        />
      </div>
    </div>
  );
}

export default SearchBar;