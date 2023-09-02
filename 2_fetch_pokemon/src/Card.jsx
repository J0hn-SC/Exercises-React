import React from 'react'

const Card = ({pokemon, loading, error}) => {
  console.log("card",pokemon, loading, error)
  const card_inf = () => {
    if(pokemon){
      return {
        title: `${pokemon.name} (${pokemon.number})`,
        image: <img src={pokemon.image} alt=''></img>
      }
    }
    if(loading){
      return {
        title: `Loading`,
        image: `...`
      }
    }
    if(error){
      return {
        title: `Error! :( (xxx)`,
        image: <>
              <p>The pokemon has not be found</p>
              <button onClick={null}>Try Again</button>
              <p>This error was cauhj by the rror boundary</p>
        </>
      }
    }
    return {
      title: `No pokemon yet! (xxx)`,
      image: <p>Please submit a pokemon</p>
    }
  }
  const card_info = card_inf();
    return (
        <div>
            <h3>{card_info.title}</h3>
        <div className='img'>
          { card_info.image }
        </div>
        <table>
          <tr>
            <th>Ability</th>
            <th>Type</th>
            <th>Damage</th>
          </tr>
          {pokemon?             
            pokemon.attacks.special.map((ele, index)=>{
              console.log(ele)
              return (
                <tr key={index}>
                <td>{ele.name}</td>
                <td>{ele.type}</td>
                <td>{ele.damage}</td>
              </tr>
              )
            })
            :
            <tr>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            </tr>
          }
        </table>
        </div>
    )
}

export default Card