import { useState, useEffect } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";
import GameOverSound from "../Sounds/GameOverSound.wav";
import ClickSound from "../Sounds/ClickSound.wav";

const gameOverSound = new Audio(GameOverSound);
gameOverSound.volume = 0.2;
const clickSound = new Audio(ClickSound);
clickSound.volume = 0.5;

const PLAYER_X = "X";
const PLAYER_O = "O";

const winningCombination = [
  //Winning Rows
  { combo: [0, 1, 2], strikeClass: "strike strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike strike-row-3" },

  //winning Columns
  { combo: [0, 3, 6], strikeClass: "strike strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike strike-column-3" },
  // winning Diagonals
  { combo: [0, 4, 8], strikeClass: "strike strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike strike-diagonal-2" },
];

function checkWinner(tiles, setStrikeClass, setGameState) {
  for (const { combo, strikeClass } of winningCombination) {
    const tileValue1 = tiles[combo[0]];
    const tileValue2 = tiles[combo[1]];
    const tileValue3 = tiles[combo[2]];

    if (tileValue1 !== null && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
      setStrikeClass(strikeClass);
      if (tileValue1 === PLAYER_X) {
        setGameState(GameState.playerXWins);
      } else {
        setGameState(GameState.playerOWins);
      }
      return;
    }
  }

  const areAllTilesFilled = tiles.every((tile) => tile !== null);
  areAllTilesFilled && setGameState(GameState.draw);
}

function TicTacToe() {
  const [tiles, setTile] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [strikeClass, setStrikeClass] = useState();
  const [gameState, setGameState] = useState(GameState.inProgress);

  const handleReset = () => {
    setTile(Array(9).fill(null));
    setPlayerTurn(PLAYER_X);
    setStrikeClass(null);
    setGameState(GameState.inProgress);
  };

  const handleTileClick = (index) => {
    if (gameState !== GameState.inProgress) {
      return;
    }
    if (tiles[index] !== null) {
      return;
    }
    const newTile = [...tiles];
    newTile[index] = playerTurn;
    setTile(newTile);
    if (playerTurn === PLAYER_X) {
      setPlayerTurn(PLAYER_O);
    } else {
      setPlayerTurn(PLAYER_X);
    }
  };

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGameState);
  }, [tiles]);

  // play sound on when i press not in the load of thhe board

  useEffect(() => {
    if (tiles.some((tile) => tile !== null)) {
      clickSound.play();
    }
  }, [tiles]);
  // game over sound

  useEffect(() => {
    if (gameState !== GameState.inProgress) {
      gameOverSound.play();
    }
  }, [gameState]);
  return (
    <div className="container">
      <div className="warpper">
        <h1 className="heading-primary">Tic Tac Toe</h1>
        <Board
          strikeClass={strikeClass}
          playerTurn={playerTurn}
          tiles={tiles}
          onTileClick={handleTileClick}
        />
        <GameOver gameState={gameState} />
        <Reset gameState={gameState} onReset={handleReset} />
      </div>
    </div>
  );
}

export default TicTacToe;
