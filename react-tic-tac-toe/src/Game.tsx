import { useState } from "react";
import Square from "./Square";

const INITIAL_GAME_STATE = ["", "", "", "", "", "", "", "", ""];

function Game() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [currentPlayer, setCurrentPlayer] = useState("X");

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
    </div>
  );
}

export default Game;
