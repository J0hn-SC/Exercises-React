import { useState } from 'react'
import './App.css'
import Board from './components/Board.jsx'
import Menu from './components/Menu.jsx'
/*
board = [0,1,2]
        [3,4,5]
        [6,7,8]
*/
const STREAKS = [[0,1,2],[3,4,5],[6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8],[2,4,6]]
const INITIAL_BOARD = [null, null, null, null, null, null, null, null, null]
const INITIAL_STATE = {
  boards: [INITIAL_BOARD],
  currentBoard: 0
}

const analyzeBoard = (board) => {
  //console.log("Analyzing board")
  //1 - if someone wins the game
  for(const streak of STREAKS){
    const [a, b, c] = streak.map(ele => board[ele])
    if(a!== null && a===b && b===c){
      return {gameFinished: true, winner : a, playerToMove : null}
    }
  }
  //2 -if the board is full
  const occupiedBoxes = board.filter((ele)=> ele!==null).length ;
  if(occupiedBoxes === 9){
    return {gameFinished: true, winner: null, playerToMove: null} //0 es X_PLAYER y 1 es O_PLAYER
  }

  //3 - if they can continue playing
  return {gameFinished:false, winner:null, playerToMove: occupiedBoxes%2}

}

function App() {
  console.log("Renderizando app")
  const [state, setState] = useState(INITIAL_STATE)
  const {gameFinished, winner, playerToMove} = analyzeBoard(state.boards[state.currentBoard])
  const onPlayerMove = (id_box) => {
    let newBoard = state.boards[state.currentBoard].slice()
    newBoard[id_box] = playerToMove;
    let NEW_STATE = {
      boards: [...state.boards.slice(0, state.currentBoard + 1), newBoard],
      currentBoard: state.currentBoard + 1 
    }
    setState(NEW_STATE);
    //console.log("state",state)
  }
  const onLoadBoard = ( id_board) => {
    setState({...state, currentBoard: id_board})
  }
  const onRestart = () => {
    setState(INITIAL_STATE);
  }
  return (
    <div className="App">
      <h2>Tic Tac Toe</h2>
      <h3 className='title'>{winner===null? gameFinished === true? `Nobody won` :`its turn of ${playerToMove}` : `The winner is ${winner}`}</h3>
      <Board board={state.boards[state.currentBoard]} onPlayerMove={onPlayerMove} gameFinished={gameFinished}/>
      <Menu totalBoards={state.boards.length} currentBoard={state.currentBoard} onLoadBoard={onLoadBoard}/>
      <button disabled={state.boards.length === 1} onClick={onRestart}>Restart</button>
    </div>
  )
}

export default App
