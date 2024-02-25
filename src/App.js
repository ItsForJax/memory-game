import { useState } from 'react';
import './App.css';
import CardComponent from './components/CardComponent';

// Cards constants
const cardImages = [
  {"src": "./img/CAT.png"},
  {"src": "./img/COW.png"},
  {"src": "./img/HORSE.png"},
  {"src": "./img/LION.png"},
  {"src": "./img/MONKEY.png"},
  {"src": "./img/SHEEP.png"},
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  // Shuffle card function
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort( () => Math.random()-0.5 )
      .map((card) => ({...card, id: Math.random()}))

      setCards(shuffledCards)
      setTurns(0)
  }

  console.log(cards, turns)

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <CardComponent key={card.id} card={card}/>
        ))}
      </div>
    </div>
  );
}

export default App;
