import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      {/* Wrap the logo in a Link component */}
      <Link to="/" className="header__title-link">
        <h1 className="header__title">PokeAPI Frontend</h1>
      </Link>
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

export default Header;
