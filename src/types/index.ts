export type Server =
  | 'EUN1'
  | 'EUW1'
  | 'BR1'
  | 'JP1'
  | 'KR'
  | 'LA1'
  | 'LA2'
  | 'NA1'
  | 'OC1'
  | 'PH2'
  | 'RU'
  | 'SG2'
  | 'TH2'
  | 'TR1'
  | 'TW2'
  | 'VN2'

export type Tier =
  | 'CHALLENGER'
  | 'GRANDMASTER'
  | 'MASTER'
  | 'DIAMOND'
  | 'PLATINUM'
  | 'GOLD'
  | 'SILVER'
  | 'BRONZE'
  | 'IRON'

export type SummonerBasic = {
  id: string
  name: string
  profileIconId: number
  summonerLevel: number
  puuid: string
}

export type TopSoloQPlayers = {
  leaguePoints: number
  summonerId: string
  summonerName: string
  rank: string
  wins: number
  losses: number
}

export type TopSoloQPlayersPlusIcon = TopSoloQPlayers & {
  profileIconId: number
}

export type SummonerLeague = {
  leagueId: string
  queueType: 'RANKED_FLEX_SR' | 'RANKED_SOLO_5x5'
  tier: Tier
  rank: 'I' | 'II' | 'III' | 'IV'
  summonerId: string
  summonerName: string
  leaguePoints: number
  wins: number
  losses: number
  veteran: boolean
  inactive: boolean
  freshBlood: boolean
  hotStreak: boolean
  miniSeries: {
    target: number
    wins: number
    losses: number
    progress: string
  }
}

export type SummonerRankedLeagues = {
  RANKED_FLEX_SR?: SummonerLeague
  RANKED_SOLO_5x5?: SummonerLeague
}
