import { RegionName } from '../types'

const API_KEY = import.meta.env.VITE_TAPI_KEY

export const fetchSummonerDataByName = async (name: string, region: RegionName) => {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`
  )
  const data  = await response.json()
  return data
}

