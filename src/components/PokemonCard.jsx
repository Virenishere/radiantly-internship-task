import React from "react";

const PokemonCard = ({name,image}) =>{
    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <img src={image} alt={name} className="w-full h-48 object-contain" />
            <h3 className="text-center text-lg font-semibold mt-2">{name}</h3>
        </div>
    );
};

export default PokemonCard;