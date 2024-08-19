import { useState } from "react";
import Board from "./Board";
import GameLogic from "./GameLogic";
import LandingPage from "./LandingPage";

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const PLAYER_X = "X";
  const PLAYER_O = "O";
  const [turn, setTurn] = useState(PLAYER_X);
  const [gameOver, setGameOver] = useState(false);
  const [winningCombination, setWinningCombination] = useState(null);
  const [reset, setReset] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const clickSquare = (index) => {
    if (squares[index] !== null || gameOver) return;
    const newSquares = [...squares];
    newSquares[index] = turn;
    setSquares(newSquares);
    setTurn(turn === PLAYER_X ? PLAYER_O : PLAYER_X);
  };

  const handleGameEnd = (result, combination) => {
    setGameOver(true);
    setWinningCombination(combination);
  };

  const handleNextTurn = (nextTurn) => {
    setTurn(nextTurn);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setTurn(PLAYER_X);
    setGameOver(false);
    setWinningCombination(null);
    setReset(true);
    setTimeout(() => setReset(false), 0);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  if (!gameStarted) {
    return <LandingPage onStart={startGame} />;
  }

  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>
      <Board
        squares={squares}
        onSquareClick={clickSquare}
        winningCombination={winningCombination}
      />
      <GameLogic
        squares={squares}
        turn={turn}
        onGameEnd={handleGameEnd}
        onNextTurn={handleNextTurn}
        reset={reset}
      />
      {gameOver && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={resetGame}
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default TicTacToe;
