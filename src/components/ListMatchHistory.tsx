
import moment from 'moment'
import { MatchDTO, Server } from '../types'
import { Link } from 'react-router-dom'

import { getGameType } from '../utilities/gameModeSwich'

interface ListMatchHistoryProps {
  historyList: MatchDTO[]
  summonerName: string
  versionPatch: string
  server: Server
}

interface SummonerGameDetails {
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
  const times = (timestamps: number, action: string) => {
    if (action === 'fromNow') {
      return moment(timestamps).fromNow()
    } else if (action === 'duration') {
      const duration = moment.duration(timestamps, 'seconds')

      return `${duration.minutes()}m ${duration.seconds()}s`
    }
  }

  const summonerMatchDetails = (game: MatchDTO): SummonerGameDetails => {
    const summonerObj = game.info.participants.find(
      (summoner) => summoner.summonerName === summonerName
    )

    return {
      championId: summonerObj?.championId,
      championName: summonerObj?.championName,
      deaths: summonerObj?.deaths,
      kills: summonerObj?.kills,
      assists: summonerObj?.assists,
      win: summonerObj?.win,
      item0: summonerObj?.item0,
      item1: summonerObj?.item1,
      item2: summonerObj?.item2,
      item3: summonerObj?.item3,
      item4: summonerObj?.item4,
      item5: summonerObj?.item5,
      item6: summonerObj?.item6,
      summoner1Id: summonerObj?.summoner1Id,
      summoner2Id: summonerObj?.summoner2Id,
    }
  }

  const calculateKDA = (
    kills: number,
    deaths: number,
    assists: number
  ): string => {
    return ((kills + assists) / deaths).toFixed(2)
  }

  const summonerSpells: { [key: number]: string } = {
    1: 'SummonerBoost',
    3: 'SummonerExhaust',
    4: 'SummonerFlash',
    6: 'SummonerHaste',
    7: 'SummonerHeal',
    11: 'SummonerSmite',
    12: 'SummonerTeleport',
    13: 'SummonerMana',
    14: 'SummonerDot',
    21: 'SummonerBarrier',
    30: 'SummonerPoroRecall',
    31: 'SummonerPoroThrow',
    32: 'SummonerSnowball',
    39: 'SummonerSnowURFSnowball_Mark',
  }

  console.log('historyList', historyList)

  return (
    <div className="  ">
      <div className="p-3 rounded-md  bg-white text-slate-500 font-medium text-base dark:text-slate-100 dark:bg-slate-800  dark:border-slate-800">
        Match History
      </div>

      {historyList.map((match) => {
        const summonerGameDetails = summonerMatchDetails(match)

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
            <div className="col-span-1 ">
              <div> {getGameType(match.info.queueId)} </div>
              <div>{times(match.info.gameCreation, 'fromNow')} </div>
              <div className=" space-x-2">
                <div>{times(match.info.gameDuration, 'duration')}</div>
                <div
                  className={`${
                    summonerGameDetails.win ? 'text-blue-500' : 'text-red-500'
                  } font-medium`}
                >
                  {summonerGameDetails.win ? 'WIN' : 'LOSS'}
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
    </div>
  )
}
