import { TopSoloQPlayers } from "../types"

export const quickSort = (
  arr: TopSoloQPlayers[],
  property: 'leaguePoints'
): TopSoloQPlayers[] => {
  if (arr.length <= 1) {
    return arr
  }

  const pivot = arr[0][property]
  const less: TopSoloQPlayers[] = []
  const greater: TopSoloQPlayers[] = []

  for (let i = 1; i < arr.length; i++) {
    if (arr[i][property] > pivot) {
      greater.push(arr[i])
    } else {
      less.push(arr[i])
    }
  }

  return [
    ...quickSort(greater, property),
    { ...arr[0] },
    ...quickSort(less, property),
  ]
}
