import { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [currentTurn, setCurrentTurn] = useState<"X" | "O">("X");

  const [squares, setSquares] = useState(new Array(9).fill(null));
  const SquaresPerRow = new Array(3).fill(null);
  const rows = new Array(squares.length / SquaresPerRow.length).fill(null);

  function handleClick(squareIndex: number) {
    if (squares[squareIndex] || calculateWinner(squares)) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[squareIndex] = currentTurn;
    setCurrentTurn((prev) => (prev === "X" ? "O" : "X"));
    setSquares(newSquares);
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Current Player: " + currentTurn;
  }

  return (
    <div className="board">
      <h1 className="text-3xl">{status}</h1>
      {rows.map((_, RowIdx) => {
        return (
          <div key={Math.random() * 100} className="row flex items-center">
            {SquaresPerRow.map((_, SquareIdx) => {
              const value = RowIdx * SquaresPerRow.length + SquareIdx;
              return (
                <Square
                  key={Math.random() * 100}
                  value={squares[value]}
                  onClick={() => handleClick(value)}
                />
              );
            })}
          </div>
        );
      })}
      <button
        onClick={() => setSquares([...Array(9).fill(null)])}
        className="bg-blue-600 text-white px-3 py-2 rounded-md"
      >
        Play again
      </button>
    </div>
  );
};

export default Board;

// stolen from react.dev
function calculateWinner(squares: any[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
