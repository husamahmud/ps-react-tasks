import { useState, type FC, type ReactNode } from "react";
import { useDrop } from "react-dnd";

import type { Game } from "./game";
import { ItemTypes } from "./ItemTypes";
import { Overlay, OverlayType } from "./Overlay";
import { Square } from "./square";

export interface BoardSquareProps {
  x: number;
  y: number;
  children?: ReactNode;
  game: Game;
  drawXO: any;
}

export const BoardSquare: FC<BoardSquareProps> = ({
  x,
  y,
  children,
  game,
  drawXO,
}: BoardSquareProps) => {
  const black = (x + y) % 2 === 1;
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: [ItemTypes.X, ItemTypes.O],
      canDrop: () => game.canDrop(x, y),
      drop: (item: any) => {
        game.Move(x, y, item.name);
        drawXO(x, y, item.name);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [game]
  );

  return (
    <div
      ref={drop}
      // role="Space"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Square black={black}>{children}</Square>
      {isOver && !canDrop && <Overlay type={OverlayType.IllegalMoveHover} />}
      {isOver && canDrop && <Overlay type={OverlayType.LegalMoveHover} />}
    </div>
  );
};
