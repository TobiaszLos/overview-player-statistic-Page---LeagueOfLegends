import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchSummonerDataById, fetchSummonerDataByName } from '../services'
import { RegionName, TopSoloQPlayers } from '../types'

interface TopPlayerSectionProps {
  versionPath: string
  region: RegionName
  player: TopSoloQPlayers
  rank: number
}

export const TopPlayerSection = ({
  versionPath,
  region,
  rank,
  player,
}: TopPlayerSectionProps) => {
  const [loading, setLoading] = useState(true)
  const [icon, setIcon] = useState<string>()
  const [level, setLevel] = useState<number>()

  const getLevelAndSummonerIcon = async () => {
    setLoading(true)
    const fetchedByName = await fetchSummonerDataById(region, player.summonerId)
    // const fetchedByName = await fetchSummonerDataByName(
    //   region,
    //   player.summonerName
    // )
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
        <Link
          to={`${region}/${player.summonerName}`}
          className="hover:border p-4 rounded-2xl hover:border-slate-300 dark:hover:border-slate-600"
        >
          <li>
          <div className=' text-xs mb-2 text-slate-500'>Rank. {rank + 1}</div>
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/${versionPath}/img/profileicon/${icon}.png`}
              alt=""
              className='w-full rounded-lg'
            />
            <div className="font-medium text-cyan-700 dark:text-cyan-500 pt-2 ">
              {player.summonerName}
            </div>
            
            <div className='text-sm'>{player.leaguePoints} LP</div>
          </li>
        </Link>
      )}
    </>
  )
}
