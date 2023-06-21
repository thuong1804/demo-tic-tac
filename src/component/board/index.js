import React, { useEffect, useState } from "react";
import Square from "../square";
import "./board.css";

function Board() {







  const [squares, setSquares] = useState(Array(9).fill(null));
  const [inext, setInext] = useState(true);
  const [result, setResult] = useState([]);
  const [current,setCurrent] = useState(0);

  const winner = calculateWinner(squares);

  let status;

  function checkwinner() {
  
    if( winner) {
      status = "winner" + winner;
     
    }

    else {
      status = "next player " + (inext ? " X " : " O ");
    }
    useEffect(()=>{
      
      if(winner)
      saveHistory();
     
    },[winner])
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

  const saveHistory = () => {
    
    setResult([...result, `the winner is ${winner}`])
    
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
    // saveHistory();

    setInext(!inext);
  }



  function handelReset() {
    setSquares(Array(9).fill(null));
   
  }

  // function jumpto(nextmore){
   
  //   setCurrent(nextmore)
  // }

  return (

    <div>
      <div className={checkwinner()} style={{ textAlign: 'center', fontSize: '30px', paddingBottom: '30px' }}>{status}</div>
      <div>

        <div className="board-row">
          {squares.map((squa, index) => (

            <Square key={index} value={squa} onSquareClick={() => handleClick(index)} />


          ))}


        </div>

      </div>
      <div className="reset-game">
        <button onClick={handelReset} className="btn-reset">Reset Game</button>
      </div>
      <ol>
        {result.map((sq, index) => (<li key={index}>
          <button >{sq}</button>
        </li>))}
      </ol>



    </div>
  );
}
export default Board;
