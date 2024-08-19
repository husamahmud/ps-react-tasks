import type { CSSProperties, FC } from "react";
import { DragPreviewImage, useDrag } from "react-dnd";

import { ItemTypes } from "./ItemTypes";
import Image from "next/image";

export interface X {
  xTurn: any;
}

const knightStyle: CSSProperties = {
  fontSize: 40,
  fontWeight: "bold",
  cursor: "move",
};

export const X: FC<X> = ({ xTurn }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.X,
      item: { name: "X" },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  return (
    <>
      <div
        ref={drag}
        style={{
          ...knightStyle,
          opacity: isDragging ? 0.5 : 1,
          display: xTurn ? "block" : "none",
        }}
      >
        <Image src={"/X.png"} alt="X" width={100} height={100} />
      </div>
    </>
  );
};
