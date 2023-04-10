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

export type Region = 'AMERICAS' | 'EUROPE' | 'ASIA' | 'SEA'

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

export type TopSoloQPlayer = {
  leaguePoints: number
  summonerId: string
  summonerName: string
  rank: string
  wins: number
  losses: number
}

export type TopSoloQPlayerPlusIcon = TopSoloQPlayer & {
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



export type MatchDTO = {
  metadata: {
    dataVersion: string
    matchId: number
    participants: string[]
  }
  info: {
    gameCreation: number
    gameDuration: number
    gameId: number
    gameMode: string
    gameName: string
    gameStartTimestamp: number
    gameType: string
    gameVersion: string
    mapId: number
    participants: ParticipantDTO[]
    platformId: string
    queueId: number
    teams: TeamDTO[]
    tournamentCode?: string
  }
}

export type ParticipantDTO = {
  assists: number
  baronKills: number
  bountyLevel: number
  champExperience: number
  champLevel: number
  championId: number
  championName: string
  championTransform: number
  consumablesPurchased: number
  damageDealtToBuildings: number
  damageDealtToObjectives: number
  damageDealtToTurrets: number
  damageSelfMitigated: number
  deaths: number
  detectorWardsPlaced: number
  doubleKills: number
  dragonKills: number
  firstBloodAssist: boolean
  firstBloodKill: boolean
  firstTowerAssist: boolean
  firstTowerKill: boolean
  gameEndedInEarlySurrender: boolean
  gameEndedInSurrender: boolean
  goldEarned: number
  goldSpent: number
  individualPosition: string
  inhibitorKills: number
  inhibitorTakedowns: number
  inhibitorsLost: number
  item0: number
  item1: number
  item2: number
  item3: number
  item4: number
  item5: number
  item6: number
  itemsPurchased: number
  killingSprees: number
  kills: number
  lane: string
  largestCriticalStrike: number
  largestKillingSpree: number
  largestMultiKill: number
  longestTimeSpentLiving: number
  magicDamageDealt: number
  magicDamageDealtToChampions: number
  magicDamageTaken: number
  neutralMinionsKilled: number
  nexusKills: number
  nexusTakedowns: number
  nexusLost: number
  objectivesStolen: number
  objectivesStolenAssists: number
  participantId: number
  pentaKills: number

  physicalDamageDealt: number
  physicalDamageDealtToChampions: number
  physicalDamageTaken: number
  profileIcon: number
  puuid: string
  quadraKills: number
  riotIdName: string
  riotIdTagline: string
  role: string
  sightWardsBoughtInGame: number
  spell1Casts: number
  spell2Casts: number
  spell3Casts: number
  spell4Casts: number
  summoner1Casts: number
  summoner1Id: number
  summoner2Casts: number
  summoner2Id: number
  summonerId: string
  summonerLevel: number
  summonerName: string
  teamEarlySurrendered: boolean
  teamId: number
  teamPosition: string
  timeCCingOthers: number
  timePlayed: number
  totalDamageDealt: number
  totalDamageDealtToChampions: number
  totalDamageShieldedOnTeammates: number
  totalDamageTaken: number
  totalHeal: number
  totalHealsOnTeammates: number
  totalMinionsKilled: number
  totalTimeCCDealt: number
  totalTimeSpentDead: number
  totalUnitsHealed: number
  tripleKills: number
  trueDamageDealt: number
  trueDamageDealtToChampions: number
  trueDamageTaken: number
  turretKills: number
  turretsLost: number
  unrealKills: number
  visionScore: number
  visionWardsBoughtInGame: number
  wardsKilled: number
  wardsPlaced: number
  win: boolean
  [key: string]: number | boolean | string;
}

// export interface ParticipantDetails {
//   championId?: number
//   championName?: string
//   deaths?: number
//   kills?: number
//   assists?: number
//   win?: boolean
//   item0?: number
//   item1?: number
//   item2?: number
//   item3?: number
//   item4?: number
//   item5?: number
//   item6?: number
//   summoner1Id?: number
//   summoner2Id?: number
//   [key: string]: number | string | boolean | undefined
// }



export type TeamDTO = {
  bans: BanDTO[]
  objectives: ObjectivesDTO
  teamId: number
  win: boolean
}

export type BanDTO = {
  championId: number
  pickTurn: number
}

export type ObjectivesDTO = {
  baron: ObjectiveDTO
  champion: ObjectiveDTO
  dragon: ObjectiveDTO
  inhibitor: ObjectiveDTO
  riftHerald: ObjectiveDTO
  tower: ObjectiveDTO
}

export type ObjectiveDTO =  {
  first: boolean
  kills: number
}
