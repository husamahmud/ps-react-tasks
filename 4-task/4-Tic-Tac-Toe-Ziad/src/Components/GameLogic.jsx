import { useEffect, useState } from "react";

const GameLogic = ({ squares, turn, onGameEnd, onNextTurn, reset }) => {
  const [gameStatus, setGameStatus] = useState({
    winner: null,
    combination: null,
  });

  useEffect(() => {
    if (reset) {
      setGameStatus({ winner: null, combination: null });
    }
  }, [reset]);

  const checkWinner = (squares) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], combination: lines[i] };
      }
    }

    if (squares.every((square) => square !== null)) {
      return { winner: "draw", combination: null };
    }

    return { winner: null, combination: null };
  };

  useEffect(() => {
    const result = checkWinner(squares);
    if (result.winner) {
      setGameStatus(result);
      onGameEnd(result.winner, result.combination);
    } else {
      onNextTurn(turn);
    }
  }, [squares, turn]);

  const renderStatus = () => {
    if (gameStatus.winner === "draw") {
      return <p className="text-xl mt-4">It's a draw!</p>;
    } else if (gameStatus.winner) {
      return <p className="text-xl mt-4">Winner: {gameStatus.winner}</p>;
    } else {
      return <p className="text-xl mt-4">Next player: {turn}</p>;
    }
  };

  return <div className="text-center">{renderStatus()}</div>;
};

export default GameLogic;
