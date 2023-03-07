import { RegionName, SummonerBasic, TopSoloQPlayers } from '../types'

const API_KEY = import.meta.env.VITE_TAPI_KEY

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
