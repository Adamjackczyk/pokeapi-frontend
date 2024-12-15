import React, { useState, useEffect } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import Preloader from "../Preloader/Preloader";
import SearchBar from "../SearchBar/SearchBar";
import { fetchPokemonList } from "../../utils/PokeApi";
import "./DataPage.css";

const DataPage = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 20;
  const [total, setTotal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Load from local storage on mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("pokemon")) || [];
    if (storedData.length > 0) {
      setPokemon(storedData);
      setOffset(storedData.length);
    } else {
      loadPokemon();
    }
  }, []);

  // Save to local storage whenever pokemon state changes
  useEffect(() => {
    localStorage.setItem("pokemon", JSON.stringify(pokemon));
  }, [pokemon]);

  const loadPokemon = async () => {
    setLoading(true);
    try {
      const data = await fetchPokemonList(offset, limit);
      setPokemon((prev) => [...prev, ...data.results]);
      setOffset((prev) => prev + limit);
      setTotal(data.count); // Total number of Pokémon
    } catch (err) {
      setError("Failed to fetch Pokémon data.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    loadPokemon();
  };

  const handleClearCache = () => {
    localStorage.removeItem("pokemon");
    setPokemon([]);
    setOffset(0);
    loadPokemon();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allLoaded = total !== null && pokemon.length >= total;

  return (
    <div className="data-page">
      <h2 className="data-page__title">Pokémon List</h2>
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      {error && <p className="data-page__error">{error}</p>}
      <div className="pokemon-grid">
        {filteredPokemon.map((poke, index) => (
          <PokemonCard key={index} name={poke.name} url={poke.url} />
        ))}
      </div>
      {loading && <Preloader />}
      {!loading && !allLoaded && (
        <button className="show-more-button" onClick={handleShowMore}>
          Show More
        </button>
      )}
      {allLoaded && <p className="all-loaded">All Pokémon loaded.</p>}
      {pokemon.length > 0 && (
        <button className="clear-cache-button" onClick={handleClearCache}>
          Clear Cache
        </button>
      )}
    </div>
  );
};

export default DataPage;
