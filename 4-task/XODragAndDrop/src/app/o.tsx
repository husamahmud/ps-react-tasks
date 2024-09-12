import type { CSSProperties, FC } from "react";
import { DragPreviewImage, useDrag } from "react-dnd";

import { ItemTypes } from "./ItemTypes";
import Image from "next/image";

export interface O {
  oTurn: any;
}

const knightStyle: CSSProperties = {
  fontSize: 40,
  fontWeight: "bold",
  cursor: "move",
};

export const O: FC<O> = ({ oTurn }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.O,
      item: { name: "O" },
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
          display: oTurn ? "block" : "none",
        }}
      >
        <Image src={"/O.png"} alt="X" width={100} height={100} />
      </div>
    </>
  );
};
