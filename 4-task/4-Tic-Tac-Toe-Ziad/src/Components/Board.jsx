import Squares from "./Squares";
import Strike from "./Strike";

const Board = ({ squares, onSquareClick, winningCombination }) => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-0 cursor-pointer relative w-[300px] h-[300px] my-10">
      {squares.map((value, index) => (
        <Squares
          key={index}
          onClick={() => onSquareClick(index)}
          value={value}
        />
      ))}
      <Strike winningCombination={winningCombination} />
    </div>
  );
};

export default Board;
