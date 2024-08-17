import { useState } from "react";
import Board from "./Board";

const PLAYER_X = "X";
const PLAYER_O = "O";

function TicTacToe() {
  const [tiles, setTile] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);

  const handleTileClick = (index) => {
    if (tiles[index] !== null) {
      return;
    }

    const newTile = { ...tiles };
    newTile[index] = playerTurn;
    setTile(newTile);
    if (playerTurn === PLAYER_X) {
      setPlayerTurn(PLAYER_O);
    } else {
      setPlayerTurn(PLAYER_X);
    }
  };
  return (
    <>
      <h1>TicTacToe</h1>
      <Board playerTurn={playerTurn} tiles={tiles} onTileClick={handleTileClick} />
    </>
  );
}

export default TicTacToe;
