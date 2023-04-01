import { Link } from "react-router-dom"
import { Server, TopSoloQPlayersPlusIcon } from "../types"

interface TopPlayerSectionProps {
  versionPath: string
  server: Server
  player: TopSoloQPlayersPlusIcon
  rank: number
}

export const TopPlayerCard = ({
  versionPath,
  server,
  rank,
  player,
}: TopPlayerSectionProps) => {
  return (
    <>
      <Link
        to={`${server}/${player.summonerName}`}
        className="hover:border p-4 rounded-2xl hover:border-slate-300 dark:hover:border-slate-600"
      >
        <li>
          <div className=" text-xs mb-2 text-slate-500">Rank. {rank + 1}</div>
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/${versionPath}/img/profileicon/${player.profileIconId}.png`}
            alt=""
            className="w-full rounded-lg"
          />
          <div className="font-medium text-cyan-700 dark:text-cyan-500 pt-2 ">
            {player.summonerName}
          </div>

          <div className="text-sm">
            {' '}
            {(player.leaguePoints / 1000).toFixed(3).replace('.', ',')} LP{' '}
          </div>
        </li>
      </Link>
    </>
  )
}