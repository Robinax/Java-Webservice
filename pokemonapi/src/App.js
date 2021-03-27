import React,{ useState, useEffect} from 'react';
import './App.css';
import Card from './components/Card';
import Pokeinfo from './components/Card/pokeinfo';
import { getAllPokemon, getPokemon} from './services/pokemon';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemoninfo, setPokemoninfo] = useState({});
  const [view, setView] = useState('');
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=90'
  

  const removePokemon = (rpokemon) =>{
    
    const newPokemonData = pokemonData.filter(pokemon => pokemon !== rpokemon)
    setPokemonData(newPokemonData)
  }

  const pokemoninformation = (pokeinfo) =>{
    setPokemoninfo(pokeinfo)
    setView('pokemoninfo')
    
  }

  useEffect(()=>{
    async function fetchData(){
      let response = await getAllPokemon(initialUrl);
     // setNextUrl(response.next);
     // setPrevUrl(response.previous);
      let pokemon = await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);
  const loadingPokemon = async (data) => {
      let _pokemonData = await Promise.all(
      data.map(async pokemon =>{
      let pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord;
    })
    );

    setPokemonData(_pokemonData);
  };
  switch (view) {
    case 'pokemoninfo':
    
      return(
        <div>
          <Pokeinfo setView={setView} pokemoninfo={pokemoninfo}/>
        </div>
      )

      default:
      return(
    <div>
    { 
    loading ? <h1>Loading...</h1> :(<>
    <div className="grid-container">
      {pokemonData.map((pokemon,i) =>{
        return <Card key={i} pokemon={pokemon} removePokemon={removePokemon} pokemoninformation={pokemoninformation}/>
      })}
    </div> </>
    )}
    </div>)
  }
}

export default App;
