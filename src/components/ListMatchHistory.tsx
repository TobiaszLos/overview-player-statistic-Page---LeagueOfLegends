import moment from 'moment'
import { MatchDTO, Server } from '../types'
import { Link } from 'react-router-dom'

import { getGameType } from '../utilities/gameModeSwich'
import { summonerSpells } from '../utilities/getSummonerSpellName'

interface ListMatchHistoryProps {
  historyList: MatchDTO[]
  summonerName: string
  versionPatch: string
  server: Server
}

interface ParticipantDetails {
  championId?: number
  championName?: string
  deaths?: number
  kills?: number
  assists?: number
  win?: boolean
  item0?: number
  item1?: number
  item2?: number
  item3?: number
  item4?: number
  item5?: number
  item6?: number
  summoner1Id?: number
  summoner2Id?: number
  [key: string]: number | string | boolean | undefined
}

export const ListMatchHistory = ({
  historyList,
  summonerName,
  versionPatch,
  server,
}: ListMatchHistoryProps) => {
  const findSummonerByName = (
    game: MatchDTO,
    name: string
  ): ParticipantDetails => {
    const summonerObj = game.info.participants.find(
      (summoner) => summoner.summonerName === name
    )

    return {
      ...summonerObj,
    }
  }

  const timeFormat = (timestamps: number, action: string) => {
    if (action === 'fromNow') {
      return moment(timestamps).fromNow()
    } else if (action === 'duration') {
      const duration = moment.duration(timestamps, 'seconds')

      return `${duration.minutes()}m ${duration.seconds()}s`
    }
  }

  const calculateKDA = (
    kills: number,
    deaths: number,
    assists: number
  ): string => {
    return ((kills + assists) / deaths).toFixed(2)
  }

  console.log('historyList', historyList)

  return (
    <>
      <div className="p-4 rounded-lg bg-white bg-opacity-50 text-gray-700 text-sm font-medium tracking-wide dark:text-slate-100 dark:bg-slate-800 ">
        Match History
      </div>

      {historyList.map((match) => {
        const summonerGameDetails = findSummonerByName(match, summonerName)

        return (
          <div
            key={match.metadata.matchId}
            className={`p-2 my-4 ${
              summonerGameDetails.win
                ? 'border-l-8 border-l-blue-400 bg-sky-100 dark:border-l-blue-700 dark:bg-sky-900 dark:bg-opacity-20'
                : 'border-l-8 border-l-red-400 bg-red-100 bg-opacity-40 dark:border-l-rose-700 dark:bg-rose-800 dark:bg-opacity-20 '
            } grid grid-cols-5 rounded-lg text-zinc-600 dark:text-zinc-300 font-normal`}
          >
            {/* Game mode, time, length, outcome */}
            <div className="col-span-1 pl-2">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-100">
                {getGameType(match.info.queueId)}
              </div>
              <div className=" text-sm dark:text-gray-400  ">
                {timeFormat(match.info.gameCreation, 'fromNow')}{' '}
              </div>
              <div className="flex pt-2">
                <div
                  className={`${
                    summonerGameDetails.win ? 'text-blue-500' : 'text-red-500'
                  } font-medium text-sm`}
                >
                  {summonerGameDetails.win ? 'WIN' : 'LOSS'}
                </div>
                <div className=" text-sm text-gray-500 dark:text-gray-400 pl-1">
                  {timeFormat(match.info.gameDuration, 'duration')}
                </div>
              </div>
            </div>
            <div className="col-span-2">
              {/* Played champion Icon, summoner spells icons, KDA/Stats */}
              <div className="flex pb-2">
                <img
                  className=" w-12 h-12 rounded-md"
                  src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/champion/${summonerGameDetails.championName}.png`}
                  alt=""
                />
                <div className="pl-1">
                  <img
                    className="w-6 h-6 rounded-md pb-1"
                    src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/spell/${summonerSpells[
                      summonerGameDetails.summoner1Id!
                    ]!}.png`}
                    alt={summonerSpells[summonerGameDetails.summoner1Id!]}
                  />

                  <img
                    className="w-6 h-6 rounded-md"
                    src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/spell/${
                      summonerSpells[summonerGameDetails.summoner2Id!]
                    }.png`}
                    alt={summonerSpells[summonerGameDetails.summoner2Id!]}
                  />
                </div>
                <div className="pl-2">
                  <div className=" font-medium text-zinc-700 dark:text-zinc-300">
                    {summonerGameDetails.kills} /{' '}
                    <span className="text-red-700 dark:text-red-400">
                      {summonerGameDetails.deaths}{' '}
                    </span>
                    /{summonerGameDetails.assists}{' '}
                  </div>
                  <div className=" text-sm">
                    {calculateKDA(
                      summonerGameDetails.kills!,
                      summonerGameDetails.deaths!,
                      summonerGameDetails.assists!
                    )}{' '}
                    KDA
                  </div>
                </div>
              </div>

              {/* Icons items  */}
              <div className="flex">
                {Array.from({ length: 7 }).map((_, index) => {
                  const itemValue = summonerGameDetails[`item${index}`]
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

            {/* participant icons + name  */}
            <div className="hidden  md:grid grid-cols-2 col-span-2 text-xs text-slate-500 dark:text-slate-400 tracking-wide">
              <div className="grid grid-rows-5 col-start-1 col-end-2">
                {match.info.participants
                  .slice(0, 5)
                  .map((participant, index) => {
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
            </div>
          </div>
        )
      })}
    </>
  )
}
