import React from 'react';

function SearchBar({ searchTerm, onSearch, onKeyPress }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder="Search for movies..."
      />
    </div>
  );
}

export default SearchBar;
