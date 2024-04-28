import React, { useState } from "react";
import Illustrator from "../assets/illustrator.svg";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "player " + (xIsNext ? "X" : "O") + " it's your turn!";
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="w-fit mx-auto">
        <div className="board-row w-[250px]">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row w-[250px]">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row w-[250px]">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = move;
    } else {
      description = "0";
    }
    return (
      <li
        key={move}
        className="px-3 py-1 rounded-xl text-[#16bdca] bg-[#202124]"
      >
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  function restartGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  return (
    <div className="lg:flex lg:justify-between">
      <div className="bg-[#1A1A1E] rounded-xl mt-3 w-[97%] mx-auto">
        <div className="text-[35px] font-[900] text-[#16bdca] pl-5 py-5">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="">
          <ol className="w-[80%] mx-auto gap-1 flex flex-wrap text-[18px] font-[900] text-center justify-center">
            {moves}
          </ol>
        </div>
        <div className="w-fit mx-auto">
          <button
            onClick={restartGame}
            className="text-[#1A1A1E] font-[700] border border-[#45a1a7] bg-[#45a1a7] px-3 py-1.5 rounded-lg my-5 hover:bg-[#16bdca]"
          >
            Restart!
          </button>
        </div>
      </div>
      <div className="w-[100%] hidden lg:block">
        <div className="w-fit mx-auto">
          <img src={Illustrator} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Game;

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
