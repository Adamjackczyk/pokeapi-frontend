import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import PokemonCard from "../PokemonCard/PokemonCard";
import Preloader from "../Preloader/Preloader"; // Import your Preloader component
import "./Main.css";

const Main = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedPokemon, setSearchedPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch Pokémon by name
  const searchPokemon = async (name) => {
    setLoading(true);
    setError(null);
    setSearchedPokemon(null);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      const data = await response.json();
      setSearchedPokemon({ name: data.name, url: data.species.url });
    } catch {
      setError("not_found");
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      searchPokemon(value);
    } else {
      setSearchedPokemon(null);
      setError(null);
    }
  };

  return (
    <main className="main">
      {/* Welcoming Introduction */}
      <section className="main__intro">
        <h1 className="main__intro-title">
          Welcome to the World of Pokémon! 🌟
        </h1>
        <p className="main__intro-text">
          Discover the fascinating world of Pokémon with our interactive site.
          Search for your favorite Pokémon, learn about their stats, and explore
          a growing collection of creatures from the PokeAPI. Whether you're a
          seasoned Trainer or a curious newcomer, there's something here for
          everyone!
        </p>
      </section>

      {/* Search Bar */}
      <section className="main__search">
        <h2 className="main__search-title">Find Your Favorite Pokémon</h2>
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        <div className="main__search-results">
          {loading && <Preloader />} {/* Use your Preloader component here */}
          {error === "not_found" && (
            <div className="main__ditto-placeholder">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
                alt="Ditto sprite"
                className="main__ditto-image"
              />
              <p className="main__ditto-text">???</p>
            </div>
          )}
          {searchedPokemon && (
            <PokemonCard
              name={searchedPokemon.name}
              url={searchedPokemon.url}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default Main;
