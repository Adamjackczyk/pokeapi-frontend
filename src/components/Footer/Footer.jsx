import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text">
        &copy; {new Date().getFullYear()} PokeAPI Frontend. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
