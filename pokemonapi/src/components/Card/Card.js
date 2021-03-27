import React from 'react';
import './style.css';


function Card({pokemon,removePokemon,pokemoninformation}){

    
    const pokemoninfohandler = () => {
        const pokeinfo = pokemon
        pokemoninformation(pokeinfo)
        
    }
    const removehandler = () =>{
        const rpokemon= pokemon
        removePokemon(rpokemon)
    }

    return(
        <div className="Card">
            <div className="Card_img">
                <img src={pokemon.sprites.front_shiny} onClick={pokemoninfohandler} alt=''/>
            </div>
            <div className="Card_name">{pokemon.name}</div>
           <button className="removeBtn" onClick={removehandler}>Ta bort Pokemon</button>
            </div>
            );
}

export default Card;