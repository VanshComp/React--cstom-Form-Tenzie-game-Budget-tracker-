import React, { useEffect, useState } from 'react';
import { Badge, Button, Image } from 'react-bootstrap';

export default function Tenzies() {
  const [dice, setDice] = useState(generateInitialDice());
  const [roll, setRoll] = useState(false);
  const [rollNo, setRollNo] = useState(0);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [fastestTime, setFastestTime] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (roll) {
      setDice(prevDice => prevDice.map(die => (die.isHeld ? die : generateNewDie())));
      setRoll(false);
      setRollNo(prevRollNo => prevRollNo + 1);

      if (!intervalId) {
        const id = setInterval(() => {
          setTime(prevTime => prevTime + 10);
        }, 10);
        setIntervalId(id);
      }
    }
  }, [roll, intervalId]);

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);

    if (gameStarted && allHeld && allSameValue) {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      if (fastestTime === null || time < fastestTime) {
        setFastestTime(time);
      }
      setGameStarted(false);
    }
  }, [dice, gameStarted, intervalId, time, fastestTime]);

  const rollClicked = () => {
    setRoll(true);
    setGameStarted(true);
  };

  const resetGame = () => {
    setDice(generateInitialDice());
    setRollNo(0);
    setTime(0);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setRoll(false);
    setGameStarted(false);
  };

  const toggleHold = (id) => {
    if (gameStarted) {
      setDice(prevDice =>
        prevDice.map(die =>
          die.id === id ? { ...die, isHeld: !die.isHeld } : die
        )
      );
    }
  };

  return (
    <div className='body-tenzie'>
      <h1>
        <Badge bg="secondary" className='Badge'>Tenzies</Badge>
      </h1>
      <h3 className='Tenzie-h3'>
        Roll until all dice are the same. Click each die to freeze it at its current value.
      </h3>
      <div className='dice-box'>
        {dice.map(die => (
          <button
            className='dice'
            key={die.id}
            onClick={() => toggleHold(die.id)}
            style={{ backgroundColor: die.isHeld ? 'lightgreen' : 'white' }}
            disabled={!gameStarted}
          >
            {die.value === 1 && (
              <Image className='dice-image' src="https://storage.needpix.com/rsynced_images/dice-312625_1280.png" alt="die" />
            )}
            {die.value === 2 && (
              <Image className='dice-image' src='https://webstockreview.net/images/dice-clipart-two.png' alt='die'/>
            )}
            {die.value === 3 && (
              <Image className='dice-image' src="https://storage.needpix.com/rsynced_images/dice-312624_1280.png" alt="die" />
            )}
            {die.value === 4 && (
              <Image className='dice-image' src='https://cdn.pixabay.com/photo/2014/04/03/11/56/dice-312623_640.png' alt='die'/>
            )}
            {die.value === 5 && (
              <Image className='dice-image' src="https://th.bing.com/th/id/OIP.eXUP3Nx5UL1sZNWGek0sIgHaHa?rs=1&pid=ImgDetMain" alt="die" />
            )}
            {die.value === 6 && (
              <Image className='dice-image' src='https://www.clker.com/cliparts/Y/g/8/e/o/9/dice-6-hi.png' alt='die'/>
            )}
          </button>
        ))}
      </div>
      <Button className='roll' variant="primary" onClick={rollClicked}>Roll</Button>
      <Button className='reset' variant="secondary" onClick={resetGame}>Reset</Button>
      <div className='tenzie-info'>
        <h4 style={{color:'white'}}>Roll count: <Badge bg='secondary'>{rollNo}</Badge></h4>
        <h4 style={{color:'white'}} className='Timer'>Timer: </h4>
        <div style={{color:'white'}} className="timer">
          <span style={{color:'white'}} className="digits">
            {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
          </span>
          <span style={{color:'white'}} className="digits">
            {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
          </span>
          <span style={{color:'white'}} className="digits mili-sec">
            {("0" + ((time / 10) % 100)).slice(-2)}
          </span>
        </div>
        <h4 style={{color:'white'}} className='fast-time'>Fastest time: {fastestTime !== null ? (
          <>
            <span style={{color:'white'}}className="digits">
              {("0" + Math.floor((fastestTime / 60000) % 60)).slice(-2)}:
            </span>
            <span style={{color:'white'}} className="digits">
              {("0" + Math.floor((fastestTime / 1000) % 60)).slice(-2)}.
            </span>
            <span style={{color:'white'}} className="digits mili-sec">
              {("0" + ((fastestTime / 10) % 100)).slice(-2)}
            </span>
          </>
        ) : ' '}</h4>
      </div>
    </div>
  );
}

function generateInitialDice() {
  const dice = [];
  for (let i = 0; i < 10; i++) {
    dice.push(generateNewDie());
  }
  return dice;
}

function generateNewDie() {
  return {
    id: Math.random(),
    value: Math.ceil(Math.random() * 6),
    isHeld: false
  };
}
