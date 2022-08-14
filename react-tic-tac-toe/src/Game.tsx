import { useState, useEffect } from "react";
import Square from "./Square";

type Scores = {
  [key: string]: number;
};

const INITIAL_GAME_STATE = ["", "", "", "", "", "", "", "", ""];
const INITIAL_SCORES: Scores = { X: 0, O: 0 };

const WINNG_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function Game() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [scores, setScores] = useState(INITIAL_SCORES);

  useEffect(() => {
    checkForWinner();
  }, [gameState]);

  const resetBoard = () => setGameState(INITIAL_GAME_STATE);

  const handleWin = () => {
    window.alert(`Congratulations player ${currentPlayer}! You are the Winner!`);

    const newPlayerScore = scores[currentPlayer] + 1;
    const newScores = { ...scores };
    newScores[currentPlayer] = newPlayerScore;
    setScores(newScores);

    resetBoard();
  };

  const handleDraw = () => {
    window.alert("The game ended in a draw");

    resetBoard();
  };

  const checkForWinner = () => {
    let win = false;

    for (let i = 0; i < WINNG_COMBOS.length; i++) {
      const winCombo = WINNG_COMBOS[i];

      let a = gameState[winCombo[0]];
      let b = gameState[winCombo[1]];
      let c = gameState[winCombo[2]];

      if ([a, b, c].includes("")) {
        continue;
      }

      if (a === b && b === c) {
        win = true;
        break;
      }
    }

    if (win) {
      setTimeout(() => handleWin(), 500);
      return;
    }

    if (!gameState.includes("")) {
      setTimeout(() => handleDraw(), 500);
      return;
    }

    changePlayer();
  };

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleCellClick = (event: any) => {
    const cellIndex = Number(event.target.getAttribute("data-cell-index"));

    const currentValue = gameState[cellIndex];
    if (currentValue) {
      return;
    }

    const newValues = [...gameState];
    newValues[cellIndex] = currentPlayer;
    setGameState(newValues);
  };

  return (
    <div className="flex flex-col justify-evenly h-screen p-8 text-slate-800 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <h1 className="text-center text-5xl mb-4 font-display text-white">Tic Tac Toe Page</h1>
      <div className="grid grid-cols-3 gap-3 mx-auto w-96">
        {gameState.map((player, index) => {
          return <Square key={index} index={index} player={player} onClick={handleCellClick} />;
        })}
      </div>

      <dl>
        <dt>
          Next player: <span>{currentPlayer}</span>
        </dt>
        <dd>
          Player X wins: <span>{scores["X"]}</span>
        </dd>
        <dd>
          Player O wins: <span>{scores["O"]}</span>
        </dd>
      </dl>
    </div>
  );
}

export default Game;
