import type { FC } from "react";
import Image from "next/image";

export interface PieceProps {
  YPosition: true;
  XPosition: true;
}

export default function Piece({ YPosition, XPosition }: PieceProps) {
  if (XPosition) {
    return <Image src={"/X.png"} alt="X" width={100} height={100} />;
  } else if (YPosition)
    return <Image src={"/O.png"} alt="X" width={100} height={100} />;
}
