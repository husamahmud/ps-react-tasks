/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startNewGame, handleRound, handleWinner } from './store';
import { checkWinner } from './utils';

// sorry for choosing bad colors

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default function App() {
  // const [values, setValues] = useState(numbers);
  // const [newGame, setNewGame] = useState(false);
  // const [player, setPlayer] = useState('X');
  // const [winner, setWinner] = useState(null);

  const dispatch = useDispatch();
  const { values, newGame, player, winner } = useSelector((store) => store.xo);

  useEffect(() => {
    let winnerWinner = checkWinner(values);
    winnerWinner && dispatch(handleWinner(winnerWinner));
  }, [values, dispatch]);

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
            onClick={(e) => dispatch(handleRound(e.target.innerText))}
          >
            {val}
          </button>
        ))}
      </div>

      {newGame && <p className="player">Player {player}</p>}
      {winner && <p className="player">Player {winner} is winner</p>}

      {!newGame && !winner && (
        <button className="controller" onClick={() => dispatch(startNewGame())}>
          New Game
        </button>
      )}

      {newGame && !winner && (
        <button
          className="controller"
          onClick={() => confirm('Are you sure') && dispatch(startNewGame())}
        >
          Reset
        </button>
      )}

      {winner && (
        <button className="controller" onClick={() => dispatch(startNewGame())}>
          Play Again
        </button>
      )}
    </div>
  );
}
