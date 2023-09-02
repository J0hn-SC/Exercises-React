import { useState } from 'react'
import './App.css'
import Card from './Card.jsx'
function App() {
  const [mount, setMount] = useState(true);
  const check_input = () =>{
    setMount(!mount);
    console.log(mount)
  }
  return (
    <>
      <div className='App'>
        <div className='mount'>
          <label>
          <input type='checkbox' value={mount} onChange={check_input}></input>
          Mount the search bar
          </label>
        </div>
        {mount && <Card/>}
      </div>
    </>
  )
}

export default App
