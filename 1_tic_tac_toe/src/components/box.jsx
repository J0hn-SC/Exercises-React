import React from 'react'
import './box.css'
function Box(props){
  console.log("Renderizando box")
  const select = () => {
    props.onPlayerMove(props.index)
  }
  //console.log("Rendering box ",props.index)
  return (
    <button onClick={select} disabled={props.disabled} className='box hidden'>
      <h3>{props.value}</h3>
    </button>
  )
}

export default Box