import React, { useState } from "react";
import Square from "./Square";
import CalculateWinner from "./calc";

function DrawBoard() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xNext, setXNext] = useState(true);
  const infoWinner = CalculateWinner(squares);
  const winner = infoWinner ? infoWinner.winner : null;
  const lineWinner = infoWinner ? infoWinner.line : [];

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = xNext ? "X" : "O";
    setSquares(newSquares);
    setXNext(!xNext);
  };
  const renderSquare = (index) => {
    const highlight = lineWinner.includes(index);
    return (
      <Square
        value={squares[index]}
        onClick={() => handleClick(index)}
        highlight={highlight}
      />
    );
  };

  const status = winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? "It's a draw!"
    : `Next player: ${xNext ? "X" : "O"}`;

  return (
    <div className="bg-slate-800 bg-opacity-50 backdrop-filter backdrop-blur-lg max-w-max px-20 py-8 mt-28 mx-auto rounded-lg shadow-2xl">
      <h1 className="text-5xl text-center font-extrabold text-white mb-4">
        Tic Tac Toe
      </h1>
      <p className="text-center text-gray-300 text-lg mb-6">{status}</p>
      <div className="grid grid-cols-3 grid-rows-3 gap-2">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button
        className="block mt-6 mx-auto bg-gradient-to-r from-pink-400 to-pink-700 hover:from-pink-700 hover:to-pink-900 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
        onClick={() => {
          setSquares(Array(9).fill(null));
        }}
      >
        Play Again
      </button>
    </div>
  );
}

export default DrawBoard;
