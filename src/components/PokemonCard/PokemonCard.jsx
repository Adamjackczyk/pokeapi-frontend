import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./PokemonCard.css";

const PokemonCard = ({ name, url }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  // Extract Pokémon ID from the URL
  const getPokemonId = () => {
    const parts = url.split("/");
    const id = parts[parts.length - 2];
    return id;
  };

  useEffect(() => {
    const id = getPokemonId();
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    setImageUrl(imgUrl);
    setLoading(false);
  }, [url]);

  return (
    <div className="pokemon-card">
      {loading ? (
        <div className="pokemon-card__loader">Loading...</div>
      ) : (
        <>
          <img
            src={imageUrl}
            alt={`${name} sprite`}
            className="pokemon-card__image"
          />
          <h3 className="pokemon-card__name">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h3>
        </>
      )}
    </div>
  );
};

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default PokemonCard;
