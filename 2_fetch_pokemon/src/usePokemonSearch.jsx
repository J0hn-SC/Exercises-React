import React, { useEffect, useState } from 'react'

function usePokemonSearch(queryPokemon) {
    const [pokemon, setPokemon] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(()=>{
        console.log("useeffect",queryPokemon)
        console.log(!queryPokemon);
        if(!queryPokemon){
            setError(false)
            setLoading(false)
            setPokemon(null)
            return
        }
        setPokemon(null)
        setLoading(true);
        setError(false);
        console.log("Antes del fetch", queryPokemon)
        fetch('https://graphql-pokemon2.vercel.app',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: `
            query($pokemon_name:String){
            pokemon(name:$pokemon_name) {
                id
                number
                name
                image
                attacks {
                special {
                    name
                    type
                    damage
                }
                }
            }
            }
            `
            ,variables: {
            "pokemon_name": `${queryPokemon}`
            }
        })
        })
        .then((res)=>(
            res.ok? res.json(): Promise.reject(res.status)
        ))
        .then((result)=>{
            console.log("al then",result)
            setLoading(false);
            setError(false)
            if(result.data.pokemon){
                setPokemon(result.data.pokemon);
            }else{
                setError(true)
            }
        })
        

    }, [queryPokemon])
    return {pokemon, loading, error}
}

export default usePokemonSearch