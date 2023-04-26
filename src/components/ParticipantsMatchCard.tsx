import { Link } from 'react-router-dom'
import { MatchDTO, Server } from '../types'

interface ParticipantsMatchCardProps {
  match: MatchDTO
  versionPatch: string
  server: Server
  summonerName: string
}

const ParticipantsMatchCard = ({
  match,
  versionPatch,
  server,
  summonerName,
}: ParticipantsMatchCardProps) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
  }

  return (
    <>
      <div className="grid grid-rows-5 col-start-1 col-end-2  ">
        {match.info.participants.slice(0, 5).map((participant, index) => {
          return (
            <div className="flex" key={index}>
              <img
                className="w-4 h-4"
                src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/champion/${
                  participant.championName === 'FiddleSticks'
                    ? 'Fiddlesticks'
                    : participant.championName
                }.png`}
                alt=""
              />

              <Link
                onClick={handleClick}
                className={`hover:text-blue-600 ${
                  participant.summonerName === summonerName
                    ? 'font-bold text-slate-700 dark:text-slate-300'
                    : ''
                }`}
                to={`/${server}/${participant.summonerName}/`}
                target="_blank"
              >
                <div className="pl-1 truncate max-w-[80px]">
                  {participant.summonerName}
                </div>
              </Link>
            </div>
          )
        })}
      </div>
      <div className="grid grid-rows-5 col-start-2 col-end-3 ">
        {match.info.participants.slice(5).map((participant, index) => {
          return (
            <div className="flex" key={index}>
              <img
                className="w-4 h-4"
                src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/champion/${
                  participant.championName === 'FiddleSticks'
                    ? 'Fiddlesticks'
                    : participant.championName
                }.png`}
                alt=""
              />
       
              <Link
                onClick={handleClick}
                className={`hover:text-blue-600 ${
                  participant.summonerName === summonerName
                    ? 'font-bold text-slate-700 dark:text-slate-300'
                    : ''
                }`}
                to={`/${server}/${participant.summonerName}/`}
                target="_blank"
              >
                <div className="pl-1 truncate max-w-[80px]">
                  {participant.summonerName}
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ParticipantsMatchCard
