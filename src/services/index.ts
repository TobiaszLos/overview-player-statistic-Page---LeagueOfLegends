import {
  SummonerLeague,
  Server,
  SummonerBasic,
  TopSoloQPlayers,
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
  server: Server,
  name: string
): Promise<SummonerBasic | null> => {
  try {
    const url = `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`
    const response = await fetch(url)

    const data: SummonerBasic = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching summoner data:', { error })
    return null
  }
}

export const fetchSummonerDataById = async (
  server: Server,
  summonerId: string
): Promise<SummonerBasic | null> => {
  try {
    const url = `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}?api_key=${API_KEY}`
    const response = await fetch(url)

    const data: SummonerBasic = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching summoner data:', { error })
    return null
  }
}

export const fetchBestPlayersOfServer = async (
  server: Server
): Promise<TopSoloQPlayers[]> => {
  const url = `https://${server}.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${API_KEY}`

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
  server: Server
): Promise<SummonerLeague[]> => {
  try {
    const url = `https://${server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`
    const response = await fetch(url)

    const data: SummonerLeague[] = await response.json()

    return data
  } catch (error) {
    throw error
  }
}

///////////////////////////////////////////////////////////////////

type Region = 'AMERICAS' | 'EUROPE' | 'ASIA' | 'SEA'

const getMatchHistory = async (
  puuid: string,
  region: Region,
  count: number
): Promise<string[]> => {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}&api_key=${API_KEY}`
  )
  return response.json()
}

const getMatchDetails = async (
  matchId: string,
  region: Region
): Promise<any> => {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`
  )
  return response.json()
}

// Example usage
export const fetchMatchesList = async (puuid: string, region: Region, count = 5) => {
  const matchHistory = await getMatchHistory(puuid, region, count)

  const promises = matchHistory.map((matchId) =>
    getMatchDetails(matchId, region)
  )

  Promise.all(promises)
    .then((matchDetailsList) => {
      console.log(matchDetailsList, 'jo')
    })
    .catch((error) => {
      console.log(error(error))
    })
}

// fetchMatchesList(
//   'Qh0aYfPMyepTnUWnFOWLE4WlFG5KqzmkRSn9hmPyXlzRD_YbAB4J7E6Tnf7SiRJatcst-I3oSbI9Kw',
//   'EUROPE'
// )
//     'Qh0aYfPMyepTnUWnFOWLE4WlFG5KqzmkRSn9hmPyXlzRD_YbAB4J7E6Tnf7SiRJatcst-I3oSbI9Kw'
