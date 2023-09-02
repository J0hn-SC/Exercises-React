import { useEffect, useRef, useState } from 'react'
import './App.css'
import PokemonCard from './Card'
import usePokemonSearch from './usePokemonSearch';
function App() {
  const [queryPokemon, setQueryPokemon] = useState();
  const refQuery = useRef(null);
  const search_pokemon = () => {
    setQueryPokemon(refQuery.current.value)
  }
  const handle_search = (event) => {
    if(event.which === 13){
      search_pokemon();
    }
  }
  const handle_suggestion = (pokemon_name) => {
    refQuery.current.value = pokemon_name;
    search_pokemon();
  }
  const {pokemon, loading, error} = usePokemonSearch(queryPokemon)

  return (
    <>
      <div className='App'>
      <div className='container'>
        <div className='search'>
          <input className='input' type='text' placeholder='Which pokemon ?' ref={refQuery} onKeyDown={handle_search}/>
          <button onClick={search_pokemon}>Fetch</button>
        </div>
        <p>Out of ideas? Try 
          <button onClick={()=>handle_suggestion("Pikachu")} className='suggestion'>Pikachu</button>
          <button onClick={()=>handle_suggestion("Charizard")} className='suggestion'>Charizard</button>
          <button onClick={()=>handle_suggestion("Ninetales")} className='suggestion'>Ninetales</button>
        </p>

        <PokemonCard pokemon={pokemon} loading={loading} error={error}/>
      </div>
    </div>
    </>
  )
}

export default App
