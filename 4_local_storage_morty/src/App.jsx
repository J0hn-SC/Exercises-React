import { useEffect, useState } from 'react'
import './App.css'
import Card_Selection from './Card_Selection'
import Random from './assets/random.png'
function App() {
  console.log("Render App")
  const [idCard, setIdCard] = useState(0);
  const [currentCard, setCurrentCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [stateFetch, setStateFetch] = useState("waiting");
  
  useEffect(()=>{
    if(!localStorage.getItem("cards")){
      return
    }
    setCards(JSON.parse(localStorage.getItem("cards")))
  }, [])
  
  useEffect(()=>{
    if(!idCard || cards.length == 0){
      return
    }
    const result = cards.filter(card => card.id == idCard)
    if(result[0]){
      setCurrentCard(result[0])
      setStateFetch("finished")
    }else{
      setStateFetch("waiting")
    }
  }, [idCard])

  useEffect(()=>{
    const string_list = JSON.stringify(cards)
    localStorage.setItem("cards", string_list)
    
  }, [cards])
  const handle_fetch = (e) => {
    const async_fetch = async (id) => {
      e.target.classList.toggle("selected")
      setStateFetch("loading")
      let rpta = await fetch(`https://rickandmortyapi.com/api/character/${id}`,{
          method: "GET",
          headers: {'Content-Type': 'application/json'}
      })
      let rpta_json = await rpta.json();
      if(rpta_json.id){
        setCurrentCard(rpta_json)
        setStateFetch("finished");
        setCards( prevSetCards => [ ...prevSetCards,  rpta_json ].sort((a, b)=>{
          if(a.id > b.id){
            return 1
          }
          return -1;
        }))
      }else{
        setStateFetch("error");
      }
      e.target.classList.toggle("selected")
    }
    async_fetch(idCard)
  }
  const handle_random_fetch = (e) => {
    const value = Math.floor(Math.random() * 254) + 1;//+1 para evitar el 0
    setIdCard(value);
    handle_fetch(e);
  }
  const clear_cache = () => {
    localStorage.removeItem("cards");
    setCards([]);
    setStateFetch("waiting");
    setIdCard(0);
  }
  const handle_select_option = (index, e) => {
    setCurrentCard(cards[index]);
    setStateFetch("finished");
    e.target.classList.toggle("selected");
  }
  return (
    <div className='App'>
      <div className='div-input'>
        <input className='input-number' type='number' onChange={(e)=>{setIdCard(e.target.value)}}></input>
        <button className='btn-fetch' onClick={handle_fetch}>Fetch</button>
        <button className='btn-img' onClick={handle_random_fetch}>
          <img className='img-icon' src={Random} alt='Random'></img>
        </button>
      </div>
      <p className='text-muted'>Which Rick And Morty Character</p>
      <Card_Selection card={currentCard} state={stateFetch}/>
      <div>
        <button className='btn-clear-cache' onClick={clear_cache}>Clear Cache?</button>
        <div className='div-img-options'>
        {cards.map((card, index)=> <button key={index} className='btn-img-options' onClick={(e)=>handle_select_option(index,e)}>
          <img key={card.id} src={card.image} alt={card.name} className='img-options'></img>
        </button>)}
        </div>
      </div>
    </div>
  )
}

export default App
