interface ProgressBarProps {
  dmg?: number;
  totalDmg?: number;
  wins?: number;
  losses?: number;
}

export const ProgressBar = ({ dmg, totalDmg, wins, losses }: ProgressBarProps) => {
  if (dmg !== undefined && totalDmg !== undefined) {
    const progress = Math.floor((dmg / totalDmg) * 100);
    return (
      <div className="bg-white dark:bg-gray-100 h-[5px] overflow-hidden">
        <div className="bg-red-500 h-full" style={{ width: `${progress}%` }}></div>
      </div>
    );
  }

  if (wins !== undefined && losses !== undefined) {
    const totalGames = wins + losses;
    const winPercentage = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
    const lossPercentage = totalGames > 0 ? Math.round((losses / totalGames) * 100) : 0;
    return (
      <div className="h-1 w-full flex bg-transparent">
        <div
          className="h-full rounded-l-full bg-blue-500"
          style={{ width: `${winPercentage}%` }}
        ></div>
        <div
          className="h-full rounded-r-full bg-red-500"
          style={{ width: `${lossPercentage}%` }}
        ></div>
      </div>
    );
  }

  return null;
};
