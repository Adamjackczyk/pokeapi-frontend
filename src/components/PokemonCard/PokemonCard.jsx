import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./PokemonCard.css";

const PokemonCard = ({ name, url }) => {
  const [expanded, setExpanded] = useState(false);
  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loadingEvolution, setLoadingEvolution] = useState(false);

  // Function to fetch Pokémon details
  const fetchDetails = async (pokemonName) => {
    setLoadingDetails(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon details");
      }
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  // Function to flatten the evolution chain
  const flattenEvolutionChain = (chain) => {
    const flatChain = [];
    let current = chain;

    while (current) {
      flatChain.push(current.species.name);
      current = current.evolves_to[0] || null;
    }

    return flatChain;
  };

  // Function to fetch the evolution chain
  const fetchEvolutionChain = async () => {
    if (!details?.species?.url) return;
    setLoadingEvolution(true);
    try {
      const speciesResponse = await fetch(details.species.url);
      const speciesData = await speciesResponse.json();
      const evolutionResponse = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionResponse.json();
      const flattenedChain = flattenEvolutionChain(evolutionData.chain);
      setEvolutionChain(flattenedChain);
    } catch (error) {
      console.error("Error fetching evolution chain:", error);
    } finally {
      setLoadingEvolution(false);
    }
  };

  // Navigate to a specific Pokémon in the evolution chain
  const navigateEvolution = async (pokemonName) => {
    await fetchDetails(pokemonName);
    setEvolutionChain([]); // Reset the chain to ensure fresh fetch
    setExpanded(false); // Collapse details on navigation
  };

  // Fetch initial Pokémon details
  useEffect(() => {
    fetchDetails(name);
  }, [name]);

  return (
    <div className="pokemon-card">
      {/* Basic Pokémon Info */}
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${details?.id}.png`}
        alt={`${details?.name} sprite`}
        className="pokemon-card__image"
      />
      <h3 className="pokemon-card__name">
        {details?.name?.charAt(0).toUpperCase() + details?.name?.slice(1)}
      </h3>

      {/* Expand/Collapse Details Button */}
      <button
        className="pokemon-card__toggle"
        onClick={() => setExpanded(!expanded)}
      >
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

              {/* Evolution Navigation */}
              <button
                onClick={fetchEvolutionChain}
                className="pokemon-card__toggle"
              >
                {loadingEvolution ? "Loading Evolutions..." : "View Evolutions"}
              </button>

              {evolutionChain.length > 0 && (
                <div className="pokemon-card__evolutions">
                  {(() => {
                    const currentIndex = evolutionChain.indexOf(details.name);
                    const previousEvolution =
                      currentIndex > 0
                        ? evolutionChain[currentIndex - 1]
                        : null;
                    const nextEvolution =
                      currentIndex < evolutionChain.length - 1
                        ? evolutionChain[currentIndex + 1]
                        : null;

                    return (
                      <>
                        {/* Next Evolution */}
                        {nextEvolution && (
                          <div>
                            <p>
                              <strong>Next Evolution:</strong>
                            </p>
                            <button
                              onClick={() => navigateEvolution(nextEvolution)}
                              className="pokemon-card__evolution-button"
                            >
                              {nextEvolution.charAt(0).toUpperCase() +
                                nextEvolution.slice(1)}
                            </button>
                          </div>
                        )}

                        {/* Previous Evolution */}
                        {previousEvolution && (
                          <div>
                            <p>
                              <strong>Previous Evolution:</strong>
                            </p>
                            <button
                              onClick={() =>
                                navigateEvolution(previousEvolution)
                              }
                              className="pokemon-card__evolution-button"
                            >
                              {previousEvolution.charAt(0).toUpperCase() +
                                previousEvolution.slice(1)}
                            </button>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              )}
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
