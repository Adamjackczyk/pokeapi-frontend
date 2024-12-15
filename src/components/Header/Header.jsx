import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">PokeAPI Frontend</h1>
      <nav className="header__nav">
        <Link to="/" className="header__link">
          Home
        </Link>
        <Link to="/data" className="header__link">
          Pokémon Data
        </Link>
      </nav>
    </header>
  );
};

Header.propTypes = {
  // Define prop types if any props are passed in the future
};

export default Header;
