import challengerIcon from '../assets/img/rank_Icon/emblem-challenger.png'
import grandmasterIcon from '../assets/img/rank_Icon/emblem-grandmaster.png'
import masterIcon from '../assets/img/rank_Icon/emblem-master.png'
import diamondIcon from '../assets/img/rank_Icon/emblem-diamond.png'
import platinumIcon from '../assets/img/rank_Icon/emblem-platinum.png'
import goldIcon from '../assets/img/rank_Icon/emblem-gold.png'
import silverIcon from '../assets/img/rank_Icon/emblem-silver.png'
import bronzeIcon from '../assets/img/rank_Icon/emblem-bronze.png'
import ironIcon from '../assets/img/rank_Icon/emblem-iron.png'
import emeraldIcon from '../assets/img/rank_Icon/emerald.webp'

import { Tier } from '../types'

interface IconTierProps {
  tier: Tier
}

export const IconByTier = ({ tier }: IconTierProps) => {
  switch (tier) {
    case 'CHALLENGER':
      return <img src={challengerIcon} alt="Challenger" />
    case 'GRANDMASTER':
      return <img src={grandmasterIcon} alt="Grandmaster" />
    case 'MASTER':
      return <img src={masterIcon} alt="Master" />
    case 'DIAMOND':
      return <img src={diamondIcon} alt="Diamond" />
    case 'PLATINUM':
      return <img src={platinumIcon} alt="Platinum" />
    case 'GOLD':
      return <img src={goldIcon} alt="Gold" />
    case 'SILVER':
      return <img src={silverIcon} alt="Silver" />
    case 'BRONZE':
      return <img src={bronzeIcon} alt="Bronze" />
    case 'IRON':
      return <img src={ironIcon} alt="Iron" />
    case 'EMERALD':
      return <img src={emeraldIcon} alt="emeraldIcon" />
    default:
      return null
  }
}
