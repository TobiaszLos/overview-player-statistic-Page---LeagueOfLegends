import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchSummonerDataByName } from '../services'
import { RegionName, TopSoloQPlayers } from '../types'

interface TopPlayerSectionProps {
  versionPath: string
  region: RegionName
  player: TopSoloQPlayers
}

export const TopPlayerSection = ({
  versionPath,
  region,
  player,
}: TopPlayerSectionProps) => {
  const [loading, setLoading] = useState(true)
  const [icon, setIcon] = useState<string>()
  const [level, setLevel] = useState<number>()

  const getLevelAndSummonerIcon = async () => {
    setLoading(true)
    const fetchedByName = await fetchSummonerDataByName(
      region,
      player.summonerName
    )
    if (fetchedByName) {
      setIcon(fetchedByName.profileIconId)
      setLevel(fetchedByName.summonerLevel)
    }
    setLoading(false)
  }

  useEffect(() => {
    getLevelAndSummonerIcon()
  }, [region])

  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <Link to={`${region}/${player.summonerName}`}>
         <li key={player.summonerId}>
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/${versionPath}/img/profileicon/${icon}.png`}
            alt=""
          />
          <div>{player.summonerName}</div>
          <span>{level}</span>
        </li>
         </Link>
       
      )}
    </>
  )
}
