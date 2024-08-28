import React, { useState } from 'react';

function TicTacToe() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) return;

        const nextSquares = squares.slice();
        nextSquares[i] = isXNext ? 'X' : 'O';
        setSquares(nextSquares);
        setIsXNext(!isXNext);
    }

    const Winner = calculateWinner(squares);
    let status;
    if (Winner) {
        status = `Player ${Winner} wins!`;
        } else if (!squares.includes(null)) {
            status = "It's a draw!";
        }
        else {
            status = `Next player:  ${isXNext ? 'X' : 'O'}`;
        }

        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
              <div className="text-3xl font-bold mb-4 text-shadow-md">{status}</div>
              <div className="grid grid-cols-3 gap-2">
                {squares.map((square, i) => (
                  <button
                    key={i}
                    className={`w-32 h-32 bg-white shadow-md border-2 border-gray-300 rounded-lg text-5xl font-bold hover:bg-gray-100 hover:text-gray-700 transition duration-300 ease-in-out ${
                      Winner && (Winner === squares[i] ? 'bg-green-300 text-white' : 'bg-red-300 text-white')
                    }`}
                    onClick={() => handleClick(i)}
                  >
                    {square}
                  </button>
                ))}
              </div>
              <button
                className="mt-4 px-6 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-700 hover:text-white transition duration-300 ease-in-out"
                onClick={() => resetGame()}
              >
                Reset Game
              </button>
            </div>
          );
        
        function resetGame() {
            setSquares(Array(9).fill(null));
            setIsXNext(true);
        }

        function calculateWinner(squares) {
            const lines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
                ];
                for (let i = 0; i < lines.length; i++) {
                    const [a, b, c] = lines[i];
                    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                    return squares[a];
                }
            }
                return null;
        }

    }

export default TicTacToe;