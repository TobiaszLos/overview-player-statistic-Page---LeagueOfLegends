import {
  SummonerLeague,
  RegionName,
  SummonerBasic,
  TopSoloQPlayers,
  SummonerRankedLeagues,
} from '../types'

const API_KEY = import.meta.env.VITE_TAPI_KEY

// Summoner means the same as player.

export const getLatestPathVersion = async (): Promise<string> => {
  const response = await fetch(
    'https://ddragon.leagueoflegends.com/api/versions.json'
  )

  const data: Array<string> = await response.json()
  return data[0]
}

export const fetchSummonerDataByName = async (
  region: RegionName,
  name: string
): Promise<SummonerBasic | null> => {
  try {
    const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`
    const response = await fetch(url)

    const data: SummonerBasic = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching summoner data:', error)
    return null
  }
}

export const fetchSummonerDataById = async (
  region: RegionName,
  summonerId: string
): Promise<SummonerBasic | null> => {
  try {
    const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}?api_key=${API_KEY}`
    const response = await fetch(url)

    const data: SummonerBasic = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching summoner data:', error)
    return null
  }
}

export const fetchBestPlayersOfServer = async (
  region: RegionName
): Promise<TopSoloQPlayers[]> => {
  const url = `https://${region}.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${API_KEY}`

  try {
    const response = await fetch(url)
    const data: Record<string, TopSoloQPlayers[]> = await response.json()

    return data.entries
  } catch (error) {
    throw error
  }
}

export const fetchSummonerLeagueDetails = async (
  summonerId: string,
  region: RegionName
): Promise<SummonerLeague[]> => {
  try {
    const url = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`
    const response = await fetch(url)

    const data: SummonerLeague[] = await response.json()

    return data
  } catch (error) {
    throw error
  }
}

// const transformData = () => {
//   return data.reduce((acc, currentValue: SummonerLeague) => {
//     return {
//       ...acc,
//       [currentValue.queueType]: currentValue,
//     }
//   }, {})
// }

// return transformData() as SummonerRankedLeagues
