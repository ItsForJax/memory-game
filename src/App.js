import { useEffect, useState } from 'react';
import './App.css';
import CardComponent from './components/CardComponent';
import { initializeApp } from "firebase/app";
// import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { uid } from "uid";

const firebaseConfig = {
  apiKey: "AIzaSyDkAvj1n4yzqjkOeEP_3kXTDFeS8ivZ90U",
  authDomain: "memory-game-leader-boards.firebaseapp.com",
  databaseURL: "https://memory-game-leader-boards-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "memory-game-leader-boards",
  storageBucket: "memory-game-leader-boards.appspot.com",
  messagingSenderId: "217594973842",
  appId: "1:217594973842:web:26aecc74e7a95de07b604b",
  measurementId: "G-K4MH92YXLV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// const auth = getAuth(app);

// const authProvider = new GoogleAuthProvider()

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
  // const [loggedin, setLoggedin] = useState(false)
  const [gameover, setGameover] = useState(false)

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

  useEffect(() => {
    setGameover(cards.every(item => item.matched))
  },[cards])

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


  // auth
  // const signin = () => {
  //   signInWithPopup(auth, authProvider)
  //   .then((result)=> {
  //     setLoggedin(true)
  //   })
  //   .catch((error)=>{
  //     console.log(error)
  //   })
  // }

  // submit to leaderboard
  const handleSubmitScore = () => {
    const name = prompt('Enter Name: ')
    submitScoreToFirebare(name)
    setGameover(false)
    shuffleCards()
  }

  //submit score to the leaderboard
  const submitScoreToFirebare = (name) => {
    const uuid = uid()
    set(ref(db, `/${uuid}`), {
      name: name,
      score: turns
    })
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      {/* {
        loggedin ? 
        <button onClick={() => {auth.signOut(); setLoggedin(false)}}>Signout</button>
          :
        <button onClick={signin}>Signin</button>
      } */}
      {
        gameover ? 
        <>
          <h2>Game Over</h2>
          <button onClick={handleSubmitScore}>Submit Score</button>
        </>
       : null
      }
      <> </>
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
