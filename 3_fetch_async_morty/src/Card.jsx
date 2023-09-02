import React, { useRef, useState } from 'react'
import Random from './assets/dado.png'
import Person from './assets/person.png'
import useApi from './useApi';
import './Card.css'
const CardEmpty = () => {
    return (
        <div className='card'>
            <div className='img'>
                <img src={Person} className='icon-person'></img>
            </div>
            <div className="info">
                <p>???</p>
            </div>
        </div>
    )
}

const CardCharacter = ({character}) => {

    return (
        <div className='card'>
            <div className='div-img'>
                <img src={character.image} className='img'></img>
            </div>
            <div className="info">
                <p>{character.name}</p>
                <p>{character.id}</p>
            </div>
        </div>
    )
}

const CardLoading = (props) => {
    return (
        <div className='card'>
            <div className='img'>
                <img src={Person} className='icon-person'></img>
                <p>...</p>
            </div>
            <div className="info">
                <p>Empty</p>
                <p>Phrase</p>
            </div>
        </div>
    )
}

const CardError = () => {
    return (
        <div className='card'>
            <div className='img'>
                <img src={Person} className='icon-person'></img>
                <p className='continue'>X</p>
            </div>
            <div className="info">
                <p>XXX</p>
                <p>ERROR: Cannot read properties of null (reading 'name')</p>
            </div>
        </div>
    )
}

const CardSelect = ({character, loading, error}) => {
    if(character){
        return <CardCharacter character={character}/>
    }
    if(loading){
        return <CardLoading/>
    }
    if(error){
        return <CardError/>
    }
    return <CardEmpty/>
}

const Card = () => {
    const [id,setId] = useState();
    const refInputId = useRef(null);
    const handle_fetch = (e) => {
        setId(refInputId.current.value)
    }
    const handle_random = () => {
        const value = Math.floor(Math.random() * 254) + 1;//+1 para evitar el 0
        setId(value);
    }
    const {character, loading, error} = useApi(id);
    console.log("useapi values in card",character, loading, error)
    console.log("Esta es la cantidad de veces que se ha renderizo(osea id state ha acambiado")
    const handle_state = () => {
        if(character){
            return <CardCharacter/>
        }
        if(loading){
            return <CardLoading/>
        }
        if(error){
            return <CardError/>
        }
        return <CardEmpty/>
    }
  return (
    <div className='expansible'>
        <div className='form'>
            <input className='input' type='number' placeholder='Pick a number' ref={refInputId}></input>
            <button className='fetch' onClick={handle_fetch}>Fetch</button>
            <button className='btn-random'>
                <img className='icon' src={Random} alt='Random' onClick={handle_random}></img>
            </button>
        </div>
        <p className='text-muted'>Whick ricky and morty character?</p>
        
        {//handle_state()
        }
        <CardSelect character={character} loading={loading} error={error}/>
  </div>
  )
}

export default Card