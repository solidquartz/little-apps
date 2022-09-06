import React from 'react';

//pokemon is being passed in from App.js as props, which we destructure (instead of assigning props.pokemon to a variable)

export default function PokemonList({ pokemon }) {

  //maps the array of pokemon from props and renders them
  return (

    <div>
      {pokemon.map(p => (
        <div key={p}>
          {p}
        </div>
      ))}
    </div>
  );
}
