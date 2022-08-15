interface SquareProps {
  index: number;
  player?: string;
  onClick(event: any): void;
}

export default function Square({ index, player, onClick }: SquareProps) {
  const scale = player ? "scale-100" : "scale-0";
  const textColor = player === "X" ? "text-gray-700" : "text-white";
  const hoverStyle = "transition duration-500 hover:scale-105 transform";

  return (
    <div
      data-cell-index={index}
      {...{ onClick }}
      className={`h-40 border-solid border-4 border-slate-200 font-display text-7xl text-center flex justify-center items-center cursor-pointer ${hoverStyle}`}
    >
      <span data-cell-index={index} className={`transform transition-all duration-150 ease-out ${textColor} ${scale}`}>
        {player}
      </span>
    </div>
  );
}
