import React from "react";
import PropTypes from "prop-types";
import "./SearchBar.css";

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search-input" className="search-label">
        Search Pokémon:
      </label>
      <input
        type="text"
        id="search-input"
        className="search-input"
        placeholder="Enter Pokémon name"
        value={searchTerm}
        onChange={handleSearch}
        required
      />
    </form>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
