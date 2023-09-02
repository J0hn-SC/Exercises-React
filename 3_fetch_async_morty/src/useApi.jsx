import React, { useEffect, useState } from 'react'

const useApi = (id) => {
    console.log("se ha ejecutado useApi")
    console.log("id en useapi",id)
    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);
    
    const handle_fetch = async (id) => {
        if(!id){
            setError(false)
            setLoading(false)
            setCharacter(null)
            console.log("Un id null async")
            return
        }
        setLoading(true);
        setError(false);
        let rpta = await fetch(`https://rickandmortyapi.com/api/character/${id}`,{
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
        let rpta_json = await rpta.json();
        console.log(rpta_json)
        setLoading(false)
        //setError(false);
        if(rpta_json.id){
            setCharacter(rpta_json);
        }else{
            setError(true)
        }
    }
    
    useEffect(()=>{
        handle_fetch(id)
    },[id])
    return {character, loading, error}
}

export default useApi