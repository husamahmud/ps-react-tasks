export const calculateWinner = (squares: string[]) => {
  // Define all possible winning line combinations
  let winLines = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6], // Diagonal from top-right to bottom-left
  ];

  // Check each winning line
  for (let index = 0; index < winLines.length; index++) {
    const [a, b, c] = winLines[index];

    // If all three squares in a line are the same (and not empty),
    // we have a winner
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return the winning symbol (X or O)
    }
  }

  // If no winner is found, return null
  return null;
};
