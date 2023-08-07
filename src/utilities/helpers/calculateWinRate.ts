export const calculateWinRate = (wins: number, losses: number): string => {
  const totalGames = wins + losses
  const winRate = (wins / totalGames) * 100
  return winRate.toFixed() + '%'
}