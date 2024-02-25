import { useEffect, useState } from 'react';
import './App.css';
import CardComponent from './components/CardComponent';

// Cards constants
const cardImages = [
  {"src": "./img/CAT.png", matched: false},
  {"src": "./img/COW.png", matched: false},
  {"src": "./img/HORSE.png", matched: false},
  {"src": "./img/LION.png", matched: false},
  {"src": "./img/MONKEY.png", matched: false},
  {"src": "./img/SHEEP.png", matched: false},
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // Shuffle card function
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort( () => Math.random()-0.5 )
      .map((card) => ({...card, id: Math.random()}))
      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  }

  // handle choice
  const handleChoice = (card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare selected with useEffect
  useEffect (() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src){
        setCards(prevCard => {
          return prevCard.map( card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // reset choices
  const resetTurn = () => {
    setDisabled(false)
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(turns => turns + 1)
  }

  // auto shuffle when refreshed
  useEffect( () => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <CardComponent 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            disabled={disabled}
            flipped={card === choiceOne || card === choiceTwo || card.matched}/>
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
