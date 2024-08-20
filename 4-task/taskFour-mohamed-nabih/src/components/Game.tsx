import { useState } from "react";
import Board from "./Board";
import { calculateWinner } from "./CalcWinner";

type Props = {};

function Game({}: Props) {
  // Initialize game state
  const initialHistory = [{ squares: Array(9).fill("") }];
  const [history, setHistory] = useState(initialHistory);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [TheWinner, setTheWinner] = useState<string | null>(null);
  const [activeMove, setActiveMove] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);

  const currentStateOfBoard = history[stepNumber];

  // Handle click on a square
  const handleClick = (i: number) => {
    const historyCopy = history.slice(0, stepNumber + 1);
    const currentStateOfBoard = historyCopy[historyCopy.length - 1];
    const squares = [...currentStateOfBoard.squares];

    // Return if square is already filled or there's a winner
    if (squares[i] || TheWinner) return;

    squares[i] = xIsNext ? "❌" : "⃝";
    const winner = calculateWinner(squares);
    if (winner) setTheWinner(winner);

    // Update game state
    const newHistory = historyCopy.concat([{ squares }]);
    setHistory(newHistory);
    setXIsNext(!xIsNext);
    setStepNumber(historyCopy.length);
    setActiveMove(historyCopy.length);
  };

  // Determine game status
  const gameStatus = () => {
    if (TheWinner) {
      return "Winner: " + TheWinner;
    } else if (stepNumber === 9) {
      return "DRAW!";
    } else {
      return "Next player: " + (xIsNext ? "❌" : "⃝");
    }
  };

  // Jump to a specific move in history
  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    setDisabled(true);
    setActiveMove(step);
  };

  // Render list of moves
  const renderMoves = () =>
    history.map((_step, move) => {
      const desc = move ? ` Go To Move ↣ [ ${move} ] ` : `Go To ↣ Game Start`;

      return (
        <li key={move}>
          <button
            className={move === activeMove ? "active" : ""}
            onClick={() => jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

  // Restart the game
  const restart = () => {
    setHistory(initialHistory);
    setStepNumber(0);
    setXIsNext(true);
    setTheWinner(null);
    setDisabled(false);
    setActiveMove(0);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          disabled={disabled}
          squares={currentStateOfBoard.squares}
          onClick={handleClick}
        />
      </div>

      <div className="game-info">
        <div>{gameStatus()}</div>
        <ol>{renderMoves()}</ol>
        <button
          style={{ display: disabled ? "block" : "none" }}
          onClick={() => {
            jumpTo(history.length - 1);
            setDisabled(false);
          }}
          className="button-setting continue"
        >
          continue the Game▶
        </button>

        <button className="button-setting restart" onClick={restart}>
          Restart ↻
        </button>
      </div>
    </div>
  );
}

export default Game;
