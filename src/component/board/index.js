import React, { useState } from "react";
import Square from "../square";
import "./board.css";

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [inext, setInext] = useState(true);
  const [result, setResult] = useState(squares);


  const winner = calculateWinner(squares);





  let status;


  if (winner) {
    status = "winner" + winner;
  }

  else {
    status = "next player " + (inext ? " X " : " O ");
  }
  // function handelPlay(nextSquares){
  //   setHistory(...history,nextSquares);

  // }

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

 function handlePlay(squares){
  setResult([...squares]);
  
 }

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (inext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    console.log(nextSquares)
    // handlePlay(squares);
    setInext(!inext);
  }

  const moves = result.map((squa, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move ;
    } else {
      description = 'Go to game start';
    }
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  console.log('squares'+result)

  function handelReset() {
    setSquares(Array(9).fill(null));
  }


  function jumpTo(nextMove) {
    // TODO
  }
  return (

    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div className="reset-game">
        <button onClick={handelReset} className="btn-reset">Reset Game</button>
      </div>
      <ol>{moves}</ol>


    </div>
  );
}
export default Board;
