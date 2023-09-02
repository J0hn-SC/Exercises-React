import React from 'react'
import Person from './assets/person.png'
import './Card_Selection.css'

const CardEmpty = () => {
  console.log("CardEmpty")
  return (
    <div className='card'>
      <div className='card-img'>
        <img className='img-person' src={Person} alt='Random'></img>
      </div>
      <div className='card-info'>
        <h2 className='card-title'>???</h2>
      </div>
    </div>
  )
}
const CardCharacter = ({card}) => {
  console.log("CardCharacter")
  return (
    <div className='card'>
      <div className='card-img'>
        <img className='img-character' src={card.image} alt='Imagen'></img>
      </div>
      <div className='card-info'>
        <h2 className='card-title'>{card.name}</h2>
        <h4>#{card.id}. {card.status}. {card.species}. {card.gender}.</h4>
        <h4>origin: {card.origin.name}.</h4>
        <h4>location: {card.location.name}.</h4>
      </div>
    </div>
  )
}
const CardLoading = () => {
  console.log("CardLoading")
  return (
    <div className='card'>
      <div className='card-img'>
        <img className='img-person' src={Person} alt='Random'></img>
      </div>
      <div className='card-info'>
        <h2 className='card-title'>...</h2>
      </div>
    </div>
  )
}
const CardError = () => {
  console.log("CardError")
  return (
    <div className='card'>
      <div className='card-img'>
        <img className='img-person' src={Person} alt='Random'></img>
      </div>
      <div className='card-info'>
        <h2 className='card-title'>Error</h2>
      </div>
    </div>
  )
}

const Card_Selection = ({card, state}) => {
  console.log("Render Card Selection")
  if(state == "waiting"){
    return <CardEmpty/>
  }
  if(state == "finished"){
    return <CardCharacter card={card}/>
  }
  if(state == "loading"){
    return <CardLoading/>
  }
  if(state == "error"){
    return <CardError/>
  }
}

export default Card_Selection