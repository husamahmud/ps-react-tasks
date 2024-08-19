import type { CSSProperties, FC } from "react";
import { useMemo, useState } from "react";

import { Board } from "./board";
import { Game } from "./game";
import { X } from "./x";
import { O } from "./o";

export interface ChessboardTutorialAppState {
  knightPosition: [number, number];
}

const containerStyle: CSSProperties = {
  width: 500,
  height: 500,
  border: "1px solid gray",
};

/**
 * The Chessboard Tutorial Application
 */
export const TutorialApp: FC = () => {
  const game = useMemo(() => new Game(), []);
  const [xTurn, setXTurn] = useState(true);
  const [oTurn, setOTurn] = useState(false);

  function flipTurn() {
    setXTurn((prev: any) => !prev);
    setOTurn((prev: any) => !prev);
  }
  console.log(xTurn, oTurn);

  return (
    <div className="flex flex-row">
      <div style={containerStyle}>
        <Board game={game} flipTurn={flipTurn} />
      </div>
      <X xTurn={xTurn} />
      <O oTurn={oTurn} />
    </div>
  );
};
