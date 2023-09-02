import React from 'react'
import './menu.css'
const Menu = (props) => {
  console.log("Renderizando menu")
    const { currentBoard, onLoadBoard } = props;
    let buttons = []
    for(let i=0; i<props.totalBoards; i++){
        buttons.push(<button disabled={i===props.currentBoard} key={i} onClick={()=>props.onLoadBoard(i)}>{i}</button>)
    }
  return (
    <div className='menu'>
        {buttons}
    </div>
  )
}

export default Menu