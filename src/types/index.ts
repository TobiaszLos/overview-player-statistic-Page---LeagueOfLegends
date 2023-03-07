export type RegionName =
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


  export type SummonerBasic = {
    id: string,
    name: string,
    profileIconId: string,
    summonerLevel: number,
    puuid: string,
  }


  export type TopSoloQPlayers = {
    leaguePoints: number
    summonerId: string
    summonerName: string
    rank: string
    wins: number
    losses: number
  }
  