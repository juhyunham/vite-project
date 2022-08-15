import { useState, useEffect } from "react";
import Square from "./Square";
import Popup from "./Popup";

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
  const [winner, setWinner] = useState(currentPlayer);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedScores = localStorage.getItem("scores");

    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  useEffect(() => {
    checkForWinner();
  }, [gameState]);

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 5000);
  }, [winner]);

  const resetBoard = () => setGameState(INITIAL_GAME_STATE);

  const handleWin = () => {
    const newScores = { ...scores };
    newScores[currentPlayer] = scores[currentPlayer] + 1;
    setScores(newScores);
    localStorage.setItem("scores", JSON.stringify(newScores));

    resetBoard();
  };

  const handleDraw = () => {
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
      setTimeout(() => {
        setIsOpen(true);
        setWinner(currentPlayer);
        handleWin();
      }, 500);

      return;
    }

    if (!gameState.includes("")) {
      setTimeout(() => {
        setIsOpen(true);
        setWinner("draw");
        handleDraw();
      }, 500);
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
    <>
      <div className="flex flex-col justify-evenly h-screen p-8 text-slate-800 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        <h1 className="text-center text-5xl mb-4 font-display text-white">Tic Tac Toe Page</h1>
        <div className="grid grid-cols-3 gap-3 mx-auto w-96">
          {gameState.map((player, index) => {
            return <Square key={index} index={index} player={player} onClick={handleCellClick} />;
          })}
        </div>

        <dl className="mx-auto w-96 text-3xl text-serif text-white">
          <dt className="mt-5">
            Next player: <span>{currentPlayer}</span>
          </dt>
          <dd className="mt-5">
            Player X wins: <span>{scores["X"]}</span>
          </dd>
          <dd className="mt-5">
            Player O wins: <span>{scores["O"]}</span>
          </dd>
        </dl>
      </div>
      <Popup open={isOpen} onClose={() => setIsOpen(false)}>
        {winner !== "draw" ? `Congratulations player ${winner}. You are the Winner!` : `The game ended in a draw`}
      </Popup>
    </>
  );
}

export default Game;
