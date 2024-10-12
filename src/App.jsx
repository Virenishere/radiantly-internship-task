// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./components/PokemonCard";

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then(response => {
        const pokemonList = response.data.results;
        const pokemonDetails = pokemonList.map(pokemon => 
          axios.get(pokemon.url).then(res => ({
            name: res.data.name,
            image: res.data.sprites.front_default
          }))
        );
        Promise.all(pokemonDetails).then(details => setPokemonData(details));
      });
  }, []);

  useEffect(() => {
    setFilteredPokemon(
      pokemonData.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, pokemonData]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Pokemon Data</h1>
      
      <input
        type="text"
        placeholder="Search Pokemon"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPokemon.map(pokemon => (
          <PokemonCard key={pokemon.name} name={pokemon.name} image={pokemon.image} />
        ))}
      </div>
    </div>
  );
};

export default App;
