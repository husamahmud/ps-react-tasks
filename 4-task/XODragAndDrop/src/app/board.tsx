import { useEffect, useState, type CSSProperties, type FC } from "react";

import { BoardSquare } from "./BoardSquare";
import type { Game, Position } from "./game";
import Piece from "./Piece";

export interface BoardProps {
  game: Game;
  flipTurn: any;
}

/** Styling properties applied to the board element */
const boardStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexWrap: "wrap",
};
/** Styling properties applied to each square element */
const squareStyle: CSSProperties = { width: "33.3%", height: "33.3%" };

/**
 * The chessboard component
 * @param props The react props
 */
export const Board: FC<BoardProps> = ({ game, flipTurn }) => {
  const [XPositions, setXposition] = useState<any>([]);
  const [YPositions, setYposition] = useState<any>([]);
  const [xOrODropped, setXOrODropped] = useState<any>();

  function drawXO(x: any, y: any, XorO: any) {
    setXOrODropped(XorO);
    if (XorO === "X") {
      setXposition((prev: any) => [...prev, `${x}, ${y}`]);
    } else if (XorO === "O") {
      setYposition((prev: any) => [...prev, `${x}, ${y}`]);
    }
    flipTurn();
  }
  function renderSquare(i: number) {
    const x = i % 3;
    const y = Math.floor(i / 3);
    return (
      <div key={i} style={squareStyle}>
        <BoardSquare x={x} y={y} game={game} drawXO={drawXO}>
          <Piece
            XPosition={XPositions?.includes(`${x}, ${y}`)}
            YPosition={YPositions?.includes(`${x}, ${y}`)}
          />
        </BoardSquare>
      </div>
    );
  }

  const squares = [];
  for (let i = 0; i < 9; i += 1) {
    squares.push(renderSquare(i));
  }
  return <div style={boardStyle}>{squares}</div>;
};
