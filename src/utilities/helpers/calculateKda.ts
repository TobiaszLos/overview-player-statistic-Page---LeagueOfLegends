export const calculateKDA = (
  kills: number,
  deaths: number,
  assists: number
): string => {
  if (deaths === 0) {
    return "Perfect";
  }
  return ((kills + assists) / deaths).toFixed(2);
}