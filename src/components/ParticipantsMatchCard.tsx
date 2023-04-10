import { Link } from 'react-router-dom'
import { MatchDTO, Server } from '../types'

interface ParticipantsMatchCardProps {
  match: MatchDTO
  versionPatch: string
  server: Server
}

const ParticipantsMatchCard = ({
  match,
  versionPatch,
  server,
}: ParticipantsMatchCardProps) => {
  return (
    <>
      <section className="hidden  md:grid grid-cols-2 col-span-2 text-xs text-slate-500 dark:text-slate-400 tracking-wide">
        <div className="grid grid-rows-5 col-start-1 col-end-2">
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
                  className="hover:text-blue-600"
                  to={`/${server}/${participant.summonerName}/`}
                  target="_blank"
                >
                  <div className="pl-1 truncate max-w-[80px]">
                    {participant.summonerName} {index + 5}
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
        <div className="grid grid-rows-5 col-start-2 col-end-3">
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
                  className="hover:text-blue-600"
                  to={`/${server}/${participant.summonerName}/`}
                  target="_blank"
                >
                  <div className="pl-1 truncate max-w-[80px]">
                    {participant.summonerName} {index + 5}
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default ParticipantsMatchCard
