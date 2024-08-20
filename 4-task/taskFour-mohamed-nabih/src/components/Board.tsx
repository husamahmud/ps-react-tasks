interface Props {
  squares: string[];
  onClick: (i: number) => void;
  disabled: boolean;
}

const Board: React.FC<Props> = ({ squares, onClick, disabled }) => {
  // Render the game board
  const renderBoard = () => {
    // Create 3 rows
    return Array.from({ length: 3 }).map((_, rowIndex) => {
      return (
        <div className="board-row" key={rowIndex}>
          {/* Create 3 columns for each row */}
          {Array.from({ length: 3 }).map((_, colIndex) => {
            // Calculate the index of the square in the 1D array
            const indexOfSquare = rowIndex * 3 + colIndex;
            return (
              <button
                className="square"
                onClick={() => onClick(indexOfSquare)}
                disabled={disabled}
                key={indexOfSquare}
              >
                {squares[indexOfSquare]}
              </button>
            );
          })}
        </div>
      );
    });
  };

  return <div>{renderBoard()}</div>;
};

export default Board;
