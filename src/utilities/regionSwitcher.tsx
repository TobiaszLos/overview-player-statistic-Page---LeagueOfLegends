import { Region, Server } from '../types'

export const getRegion = (server: Server): Region => {
  switch (server) {
    case 'NA1':
    case 'BR1':
    case 'LA1':
    case 'LA2':
    case 'OC1':
      return 'AMERICAS'
    case 'EUW1':
    case 'EUN1':
    case 'RU':
    case 'TR1':
      return 'EUROPE'
    case 'JP1':
    case 'KR':
      return 'ASIA'
    case 'SG2':
    case 'TH2':
    case 'TW2':
    case 'VN2':
      return 'SEA'
    default:
      throw new Error('Invalid server')
  }
}


