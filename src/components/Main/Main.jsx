import React from "react";
import "./Main.css";

const Main = () => {
  return (
    <main className="main">
      <h2 className="main__title">Welcome to the PokeAPI Frontend</h2>
      <p className="main__description">
        This application fetches data from the PokeAPI and displays it
        dynamically. Explore various Pokémon and learn more about them!
      </p>
    </main>
  );
};

export default Main;
