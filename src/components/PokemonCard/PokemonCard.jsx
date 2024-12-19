import React, { useState } from "react";
import PropTypes from "prop-types";
import "./PokemonCard.css";

const PokemonCard = ({ name, url }) => {
  const [expanded, setExpanded] = useState(false);
  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Modify the URL to fetch from the correct Pokémon endpoint
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${url
    .split("/")
    .slice(-2, -1)}`;

  // Function to toggle the expanded state and fetch details
  const toggleDetails = async () => {
    if (!expanded && !details) {
      setLoadingDetails(true);
      try {
        const response = await fetch(pokemonUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon details");
        }
        const data = await response.json();
        console.log(data); // Debug: Log the fetched details
        setDetails(data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      } finally {
        setLoadingDetails(false);
      }
    }
    setExpanded(!expanded);
  };

  return (
    <div className="pokemon-card">
      {/* Basic Pokémon Info */}
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url
          .split("/")
          .slice(-2, -1)}.png`}
        alt={`${name} sprite`}
        className="pokemon-card__image"
      />
      <h3 className="pokemon-card__name">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h3>

      {/* Expand/Collapse Details Button */}
      <button className="pokemon-card__toggle" onClick={toggleDetails}>
        {expanded ? "Hide Details" : "Show Details"}
      </button>

      {/* Details Section */}
      {expanded && (
        <div className="pokemon-card__details">
          {loadingDetails ? (
            <p>Loading...</p>
          ) : details ? (
            <>
              <p>
                <strong>Type:</strong>{" "}
                {details.types.map((type) => type.type.name).join(", ")}
              </p>
              <p>
                <strong>Abilities:</strong>{" "}
                {details.abilities.map((ab) => ab.ability.name).join(", ")}
              </p>
              <p>
                <strong>Base Stats:</strong>
              </p>
              <ul>
                {details.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Details could not be loaded.</p>
          )}
        </div>
      )}
    </div>
  );
};

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default PokemonCard;
