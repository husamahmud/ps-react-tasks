/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { checkWinner } from './utils';

// sorry for choosing bad colors

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default function App() {
  const [values, setValues] = useState(numbers);
  const [newGame, setNewGame] = useState(false);
  const [player, setPlayer] = useState('');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    let winner = checkWinner(values);
    if (winner) {
      setWinner(winner);
      setNewGame(false);
    }
  }, [values]);

  const handleRound = (e) => {
    if (newGame == true && Number(e.target.innerText)) {
      const newValues = [...values];
      newValues[Number(e.target.innerText) - 1] = player;
      setValues(newValues);
      setPlayer((prev) => (prev == 'X' ? 'O' : 'X'));
    } else {
      alert('Choose valid box');
    }
  };

  const handleNewGame = (e) => {
    setNewGame(true);
    setPlayer('X');
  };

  const handleReset = (e) => {
    if (confirm('Are you sure')) setValues(numbers);
    setWinner(null);
    setPlayer('X');
    setNewGame(true);
  };

  const handlePlayAgain = () => {
    setNewGame(true);
    setWinner(null);
    setValues(numbers);
    setPlayer('X');
  };

  const xoStyles = (val) => {
    const styles = {
      color: `${val == 'X' || val == 'O' ? 'white' : ''}`,
      fontWeight: `${val == 'X' || val == 'O' ? 'bold' : ''}`,
    };
    if (val == 'X') {
      styles.background = 'rgb(1000, 20, 20)';
    } else if (val == 'O') {
      styles.background = 'rgb(30, 10, 10)';
    }
    return styles;
  };

  return (
    <div className="App">
      <div className={newGame ? 'game active' : 'game'}>
        {values.map((val) => (
          <button
            style={{
              borderColor: `${newGame ? 'rgb(105, 105, 105)' : ''}`,
              cursor: `${!newGame ? 'not-allowed' : ''}`,
              ...xoStyles(val),
            }}
            key={Math.random()}
            disabled={!newGame}
            onClick={(e) => handleRound(e)}
          >
            {val}
          </button>
        ))}
      </div>

      {newGame && <p className="player">Player {player}</p>}
      {winner && <p className="player">Player {winner} is winner</p>}

      {!newGame && !winner && (
        <button className="controller" onClick={(e) => handleNewGame(e)}>
          New Game
        </button>
      )}

      {newGame && !winner && (
        <button className="controller" onClick={(e) => handleReset(e)}>
          Reset
        </button>
      )}

      {winner && (
        <button className="controller" onClick={handlePlayAgain}>
          Play Again
        </button>
      )}
    </div>
  );
}
