import React from 'react'
import Box from './box.jsx'
import './board.css'
const Board = (props) => {
    console.log("Renderizando Board")
    //console.log("Rendering board")
    //console.log("board", props.board)
  return (
    <div className='board'>
        {props.board.map((ele, index)=>{
            if(ele===0){
                return <Box key={index} index={index} value={"X"} disabled={props.gameFinished}/>
            }else if(ele===1){
                return <Box key={index} index={index} value={"O"} disabled={props.gameFinished}/>
            }else{
                return <Box key={index} index={index} value={"."} onPlayerMove={props.onPlayerMove} disabled={props.gameFinished}/>
            }
        })}
    </div>
  )
}

export default Board