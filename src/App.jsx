import { useEffect, useState } from 'react'
import './App.css'
import Die from './die'
import Die1 from "../public/dice-1.svg"
import {nanoid} from 'nanoid'
import {useWindowSize} from 'react-use';
import Confetti from 'react-confetti'


function App() {


  const [dieNumbers, setNumbers] = useState(generateNewDice()) 

  const [tenzies, setTenzies] = useState(false)



  useEffect( () => {
    let val = dieNumbers[0].number
    let counter = 0;

    dieNumbers.forEach(dice => {
      if(dice.isHeld){
        
        if(val === dice.number){
          counter++;
        }

      }
      
    })

    console.log(counter)

    if(counter === dieNumbers.length){
        setTenzies(() => true)
        
        console.log("You won")
    }



    }
  ,[dieNumbers])
  
  function generateNewDice() {
    const newNumbers = []
    for(let i = 0; i < 10 ;i++){
      const randomNumber = Math.floor(Math.random() * 6 + 1) 
      newNumbers.push({number : randomNumber, isHeld : false})
    }
    return newNumbers;
  }
  

  function clickingDie(index){
    setNumbers((prev)=>{
      const newState = [...prev]
      newState[index].isHeld = true
      return newState;
    })
  }


  function roll(){

    if(!tenzies){
        const newNumbers = []
        for(let i = 0; i < 10 ;i++){
          const randomNumber = Math.floor(Math.random() * 6 + 1) 
          if(!dieNumbers[i].isHeld){
            newNumbers.push({number : randomNumber, isHeld : false})
          }else{
            newNumbers.push(dieNumbers[i]);
          }
        }
        return newNumbers;
    }else{
      setTenzies((prev) => false)
      return generateNewDice();
    }
  }

  const { width, height } = useWindowSize()


  return (
    <main className="App">

      {(tenzies && <Confetti width={width}
      height={height} />)}

      <div className = "container">

      <h1 className="title">Tenzies</h1>

        <div className="dices">
          {
            dieNumbers.map( (el,index)=> {
              // console.log(el)
              return (
                <Die 
                  key = {nanoid()}  
                  source = {`../public/dice-${el.number}.svg`}
                  handleClick = {clickingDie}
                  index = {index}
                  isHeld = {el.isHeld}
                />
              )
            }
            )
        }

        </div>
        <button
          onClick={() => setNumbers(prev => roll())}
          className='generate-btn'
        >
          {tenzies ? "New Game" : "roll"}</button>

      </div>
    </main>
  )
}

export default App
