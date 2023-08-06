import { ChampionData } from '../../types'

export const findChampionNameByKey = (
  objRecord: Record<string, ChampionData>,
  keyToFind: string
) => {
  const foundChampion = Object.values(objRecord).find(
    (champion) => champion.key === keyToFind
  )

  if (foundChampion) {
    // console.log('Znaleziono bohatera:', foundChampion)
    return foundChampion.id
  } else {
    // console.log('Nie znaleziono bohatera o kluczu', keyToFind)
    return undefined
  }
}
