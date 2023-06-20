import React, { useState } from "react";
import Square from "../square";
import "./board.css";

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [inext, setInext] = useState(true);
  const winner = calcuWinner(squares);
  let status;

  if (winner) {
    status = "winner" + winner;
  } else {
    status = "next player " + (inext ? " X " : " O ");
  }

  function calcuWinner(squares) {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function handelClick(i) {
    const nextSquares = squares.slice();
    if (squares[i] || calcuWinner(squares)) {
      return;
    }

    if (inext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "0";
    }

    setSquares(nextSquares);
    setInext(!inext);
  }
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handelClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handelClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handelClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handelClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handelClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handelClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handelClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handelClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handelClick(8)} />
      </div>
    </div>
  );
}
export default Board;
