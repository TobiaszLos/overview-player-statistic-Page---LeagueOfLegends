import { Link } from 'react-router-dom'
import { MatchDTO, Server } from '../types'
import { calculateKDA } from '../utilities/helpers/calculateKda'

interface CollapseParticipant {
  match: MatchDTO
  versionPatch: string
  server: Server
  start: number
  end: number
}

export const CollapseParticipant = ({
  match,
  versionPatch,
  server,
  start,
  end,
}: CollapseParticipant) => {
  return (
    <div className={`grid grid-rows-5 col-start-1 col-end-2 text-xs  mb-4 bg-slate-50 dark:bg-sky-700 dark:bg-opacity-10 `}>
      <div className="grid grid-cols-12 place-content-center px-4 font-medium">
        <div className=" col-span-3">
          {!match.info.participants[start].win ? (
            <span className="text-red-300">Defeat</span>
          ) : (
            <span className="text-blue-300">Victory </span>
          )}
        </div>
        <div className=" col-span-2  text-center ">KDA</div>
        <div className=" col-span-1 text-center">Damage</div>
        <div className=" col-span-1 text-end">Wards</div>
        <div className=" col-span-1 text-center">CS</div>
        <div className=" col-span-4 text-center">Items</div>
      </div>
      {match.info.participants.slice(start, end).map((participant, index) => {
        return (
          <div
            className={`grid grid-cols-12 py-1 pl-4 ${
              match.info.participants[start].win
                ? 'bg-sky-100 dark:bg-sky-900 dark:bg-opacity-20'
                : 'bg-red-100 bg-opacity-40  dark:bg-rose-800 dark:bg-opacity-20 '
            } `}
          >
            <div className="flex col-span-3" key={index}>
              <img
                className="w-11 h-11"
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
                <div className="pl-1 ">
                  {participant.summonerName} {index + 5}
                </div>
              </Link>
            </div>
            <div className=" col-span-2 text-center ">
              <div>
                {participant.kills} / {participant.deaths} /{' '}
                {participant.assists}
              </div>
              <div>
                <span>
                  {calculateKDA(
                    participant.kills,
                    participant.deaths,
                    participant.assists
                  )}
                </span>

                <span className=" font-medium"> KDA</span>
              </div>
            </div>
            <div className=" col-span-1 ">
              <div>{participant.totalDamageDealtToChampions / 1000} </div>
            </div>
            <div className=" col-span-1 flex justify-center">
              {participant.wardsPlaced}
            </div>
            <div className=" col-span-1 flex justify-center">
              {participant.totalMinionsKilled +
                participant.neutralMinionsKilled}
            </div>
            <div className=" col-span-4  flex justify-center">
              {Array.from({ length: 7 }).map((_, index) => {
                const itemValue = participant[`item${index}`]
                return itemValue !== 0 ? (
                  <div className="w-7" key={index}>
                    <img
                      className="w-6 h-6 rounded-md"
                      src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/item/${itemValue}.png`}
                      alt=""
                    />
                  </div>
                ) : (
                  <div
                    className="w-6 h-6 bg-red-200 dark:bg-rose-700 dark:bg-opacity-25 mr-1 rounded-md"
                    key={index}
                  ></div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CollapseParticipant
