export const calculateKDA = (
  kills: number,
  deaths: number,
  assists: number
): string => {
  return ((kills + assists) / deaths).toFixed(2)
}