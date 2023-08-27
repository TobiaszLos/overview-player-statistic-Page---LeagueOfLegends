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
  | 'EMERALD'

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

// CHAMPION MASTERY //
export type ChampionMasteryStats = {
  championId: number
  championLevel: number
  championName: string
  championPoints: number
  championPointsSinceLastLevel: number
  championPointsUntilNextLevel: number
  chestGranted: boolean
  lastPlayTime: number
  summonerId: string
  tokensEarned: number
}
// API ONLY
export type ChampionData = {
  key: string
  id: string
  name: string
}
export type ChampionMasteryData = {
  championId: number
  championLevel: number
  championPoints: number
  lastPlayTime: number
  championPointsSinceLastLevel: number
  championPointsUntilNextLevel: number
  chestGranted: boolean
  tokensEarned: number
  summonerId: string
}

export type ChampionWithMastery = ChampionMasteryData & {
  championName: string
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
    gameEndTimestamp: number
    gameId: number
    gameMode: string
    gameName: string
    gameStartTimestamp: number
    gameType: string
    gameVersion: string
    mapId: number
    participants: Participant[]
    platformId: string
    queueId: number
    teams: Team[]
    tournamentCode: string
  }
}

export type Participant = {
  allInPings: number
  assistMePings: number
  assists: number
  baitPings: number
  baronKills: number
  basicPings: number
  bountyLevel: number
  champExperience: number
  champLevel: number
  championId: number
  championName: string
  championTransform: number
  commandPings: number
  consumablesPurchased: number
  damageDealtToBuildings: number
  damageDealtToObjectives: number
  damageDealtToTurrets: number
  damageSelfMitigated: number
  dangerPings: number
  deaths: number
  detectorWardsPlaced: number
  doubleKills: number
  dragonKills: number
  eligibleForProgression: boolean
  enemyMissingPings: number
  enemyVisionPings: number
  firstBloodAssist: boolean
  firstBloodKill: boolean
  firstTowerAssist: boolean
  firstTowerKill: boolean
  gameEndedInEarlySurrender: boolean
  gameEndedInSurrender: boolean
  getBackPings: number
  goldEarned: number
  goldSpent: number
  holdPings: number
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
  needVisionPings: number
  neutralMinionsKilled: number
  nexusKills: number
  nexusLost: number
  nexusTakedowns: number
  objectivesStolen: number
  objectivesStolenAssists: number
  onMyWayPings: number
  participantId: number
  pentaKills: number
  perks: Perks
  physicalDamageDealt: number
  physicalDamageDealtToChampions: number
  physicalDamageTaken: number
  profileIcon: number
  pushPings: number
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
  turretTakedowns: number
  turretsLost: number
  unrealKills: number
  visionClearedPings: number
  visionScore: number
  visionWardsBoughtInGame: number
  wardsKilled: number
  wardsPlaced: number
  win: boolean
  [key: string]: number | boolean | string | Perks
}

export interface Perks {
  statPerks: StatPerks
  styles: Style[]
}

export interface StatPerks {
  defense: number
  flex: number
  offense: number
}

export interface Style {
  description: string
  selections: Selection[]
  style: number
}

export interface Selection {
  perk: number
  var1: number
  var2: number
  var3: number
}

export interface Team {
  bans: Ban[]
  objectives: Objectives
  teamId: number
  win: boolean
}

export interface Ban {
  championId: number
  pickTurn: number
}

export interface Objectives {
  baron: Baron
  champion: Champion
  dragon: Dragon
  inhibitor: Inhibitor
  riftHerald: RiftHerald
  tower: Tower
}

export interface Baron {
  first: boolean
  kills: number
}

export interface Champion {
  first: boolean
  kills: number
}

export interface Dragon {
  first: boolean
  kills: number
}

export interface Inhibitor {
  first: boolean
  kills: number
}

export interface RiftHerald {
  first: boolean
  kills: number
}

export interface Tower {
  first: boolean
  kills: number
}

//// PERKS //

export type RuneReforged = {
  id: number
  key: string
  icon: string
  name: string
  slots: RuneSlot[]
}

export type RuneSlot = {
  runes: Rune[]
}

export type Rune = {
  id: number
  key: string
  icon: string
  name: string
  shortDesc: string
  longDesc: string
}

//// Spectator //

export interface SpectatorData {
  gameId: number
  mapId: number
  gameMode: string
  gameType: string
  gameQueueConfigId: number
  participants: ParticipantSpectatorType[]
  // observers: Observers
  platformId: string
  bannedChampions: BannedChampion[]
  gameStartTime: number
  gameLength: number
}

export interface BannedChampion {
  championId: number
  teamId: number
  pickTurn: number
}

// export interface Observers {
//   encryptionKey: string
// }

export interface ParticipantSpectatorType {
  teamId: number
  spell1Id: number
  spell2Id: number
  championId: number
  profileIconId: number
  summonerName: string
  bot: boolean
  summonerId: string
  gameCustomizationObjects: any[]
  perks: PerksSpectator
}

export interface PerksSpectator {
  perkIds: number[]
  perkStyle: number
  perkSubStyle: number
}


