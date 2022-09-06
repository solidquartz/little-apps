import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from 'axios';
import Pagination from "./Pagination";


function App() {

  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  //the PokeAPI has 'next' and 'previous' keys we can use!
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  //so the user doesn't think the site is broken if it's slow:
  const [loading, setLoading] = useState(true);

  //grabs only the pokemon names from the api and maps them for use in the PokemonList component (which requires an array)
  useEffect(() => {

    setLoading(true);

    let cancel;

    axios.get(currentPageUrl, {
      //every time axios makes a new call, it will set `cancel` to the CancelToken
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(res.data.results.map(p => p.name));
      });

    //cleans up after the axios request; cancels the previous request every time there is a new request so we never have old data (e.g., if users spam the buttons)
    return () => cancel();

  }, [currentPageUrl]);
  //every time we get a new page, we want to rerender the pokemon. so when currentPageUrl changes, it triggers the useEffect and the code inside it runs again


  const goToNextPage = () => {
    setCurrentPageUrl(nextPageUrl);
  };

  const goToPrevPage = () => {
    setCurrentPageUrl(prevPageUrl);
  };


  if (loading) return "Loading...";


  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        //prevents going backwards when on the first page or forward on the last
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPrevPage={prevPageUrl ? goToPrevPage : null}
      />
    </>
  );
}


export default App;
