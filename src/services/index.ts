import {
  SummonerLeague,
  Server,
  SummonerBasic,
  TopSoloQPlayer,
  MatchDTO,
  Region,
  ChampionData,
  ChampionMasteryData,
  ChampionWithMastery,
  RuneReforged,
  SpectatorData,

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
): Promise<TopSoloQPlayer[]> => {
  const url = `https://${server}.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${API_KEY}`

  try {
    const response = await fetch(url)
    const data: Record<string, TopSoloQPlayer[]> = await response.json()

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

const getMatchHistory = async (
  puuid: string,
  region: Region,
  count: number,
  start: number
): Promise<string[]> => {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}&api_key=${API_KEY}`
  )
  return response.json()
}

const getMatchDetails = async (
  matchId: string,
  region: Region
): Promise<MatchDTO> => {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`
  )
  return response.json()
}

export const fetchMatchesList = async (
  puuid: string,
  region: Region,
  count = 5,
  start = 0
): Promise<MatchDTO[]> => {
  try {
    const matchHistory = await getMatchHistory(puuid, region, count, start)
    const promises = matchHistory.map((matchId) =>
      getMatchDetails(matchId, region)
    )

    return await Promise.all(promises)
  } catch (error) {
    throw error
  }
}

export const fetchChampionsData = async (): Promise<
  Record<string, ChampionData>
> => {
  const latestVersion = await getLatestPathVersion()
  const championsUrl = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`
  const response = await fetch(championsUrl)
  const data = await response.json()
  return data.data as Record<string, ChampionData>
}
// CHAMPION MASTERY //
export const fetchChampionsMasteriesWithName = async (
  summonerId: string,
  server: Server,
  count = 10
): Promise<Array<ChampionWithMastery>> => {
  const championMasteryURL = `https://${server}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/top?count=${count}&api_key=${API_KEY}`

  try {
    const championMasteryResponse = await fetch(championMasteryURL)
    const championMasteryData: Array<ChampionMasteryData> =
      await championMasteryResponse.json()

    const championsData = await fetchChampionsData()
    const championsWithMastery = await Promise.all(
      championMasteryData.map(async (mastery: ChampionMasteryData) => {
        const championId = mastery.championId.toString()
        const championKey: string | undefined = Object.keys(championsData).find(
          (key) => championsData[key].key === championId
        )
        const championName = championKey
          ? championsData[championKey]?.id || ''
          : ''
        return { ...mastery, championName }
      })
    )
    return championsWithMastery
  } catch (error) {
    throw error
  }
}

export const fetchRunesReforged = async (): Promise<RuneReforged[]> => {
  const latestVersion2 = await getLatestPathVersion()
  const url = `https://ddragon.leagueoflegends.com/cdn/${latestVersion2}/data/en_US/runesReforged.json`
  const response = await fetch(url)
  const data = await response.json()

  return data as RuneReforged[]
}

export const fetchSummonerSpectatorData = async (
  server: Server,
  summonerId: string
): Promise<SpectatorData | undefined> => {
  const url = `https://${server}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${encodeURIComponent(
    summonerId
  )}?api_key=${API_KEY}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching summoner data:', { error })
    return undefined
  }
}

