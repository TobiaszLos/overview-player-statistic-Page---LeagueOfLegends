import dayjs from 'dayjs'
import moment from 'moment'
import { MatchDTO, ParticipantDTO, SummonerBasic } from '../types'
import { Link, useParams } from 'react-router-dom'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface ListMatchHistoryProps {
  historyList: MatchDTO[]
  summonerName: string
  versionPatch: string
}

type SummonerSpell = {
  id: number
  key: string
}

export const ListMatchHistory = ({
  historyList,
  summonerName,
  versionPatch,
}: ListMatchHistoryProps) => {
  const times = (timestamps: number, action: string) => {
    if (action === 'fromNow') {
      return moment(timestamps).fromNow()
    } else if (action === 'duration') {
      const duration = moment.duration(timestamps, 'seconds')

      return `${duration.minutes()}m ${duration.seconds()}s`
    }
  }

  const summonerMatchDetails = (game: MatchDTO) => {
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

  //http://ddragon.leagueoflegends.com/cdn/13.6.1/img/spell/SummonerHeal.png

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
      {/* <div className="mb-4 bg-white shadow rounded dark:bg-slate-700 border dark:border-slate-600"> */}
      <div className="p-4 shadow rounded border-b-2 bg-white text-slate-700 font-medium text-base dark:text-slate-100 dark:bg-slate-700 border dark:border-slate-600">
        Match History
      </div>

      {/* <div className=" text-slate-700 font-medium text-base dark:text-slate-100 "> */}

      {historyList.map((match) => {
        const summonerGameDetails = summonerMatchDetails(match)

        return (
          <div
            key={match.metadata.matchId}
            className={`p-2 my-4 bg-opacity-50 ${
              summonerGameDetails.win ? ' bg-blue-700' : 'bg-red-800'
            } grid grid-cols-5 rounded-lg text-zinc-600  dark:text-zinc-300 font-normal`}
          >
            <div className=' col-span-1"'>
              <div>{match.info.gameMode}</div>
              <div>{times(match.info.gameCreation, 'fromNow')} </div>
              <div className="flex space-x-2">
                <div>{times(match.info.gameDuration, 'duration')}</div>
                <div>{summonerGameDetails.win ? 'WIN' : 'LOSS'}</div>
              </div>
            </div>
            <div className=" col-span-2">
              <div className="flex space-x-1 space-y-1 ">
                <img
                  className="w-16 h-16 rounded-md"
                  src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/champion/${summonerGameDetails.championName}.png`}
                  alt=""
                />
                <div className="">
                  <img
                    className="w-8 h-8 rounded-md"
                    src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/spell/${summonerSpells[
                      summonerGameDetails.summoner1Id!
                    ]!}.png`}
                    // alt={summonerSpells[summonerGameDetails.summoner1Id!]}
                  />
                  <img
                    className="w-8 h-8 rounded-md"
                    src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/spell/${
                      summonerSpells[summonerGameDetails.summoner2Id!]
                    }.png`}
                    // alt={summonerSpells[participant.summoner2Id]}
                  />
                </div>
                <div className="pl-2">
                  <div className=" font-medium text-zinc-700 dark:text-zinc-300">
                    {summonerGameDetails.kills} / <span className='text-red-700 dark:text-red-400'>{summonerGameDetails.deaths} </span>/
                    {summonerGameDetails.assists}{' '}
                  </div>
                  <div className=' text-sm'>
                    {calculateKDA(
                      summonerGameDetails.kills!,
                      summonerGameDetails.deaths!,
                      summonerGameDetails.assists!
                    )}{' '}
                    KDA
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className=" w-8">
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/item/${summonerGameDetails.item0}.png`}
                    alt=""
                  />
                </div>
                <div className=" w-8">
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/item/${summonerGameDetails.item1}.png`}
                    alt=""
                  />
                </div>
                <div className=" w-8">
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/item/${summonerGameDetails.item2}.png`}
                    alt=""
                  />
                </div>
                <div className=" w-8">
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/item/${summonerGameDetails.item3}.png`}
                    alt=""
                  />
                </div>
                <div className=" w-8">
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/item/${summonerGameDetails.item4}.png`}
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="hidden  md:grid grid-cols-2 col-span-2">
              <div className="grid grid-rows-5 col-start-1 col-end-2">
                {match.info.participants
                  .slice(0, 5)
                  .map((participant, index) => {
                    return (
                      <div className="flex" key={index}>
                        <img
                          className="w-6 h-6"
                          src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/champion/${
                            participant.championName === 'FiddleSticks'
                              ? 'Fiddlesticks'
                              : participant.championName
                          }.png`}
                          alt=""
                        />

                        <Link
                          className="hover:text-blue-600"
                          to={`/EUW1/${participant.summonerName}/`}
                          target="_blank"
                        >
                          <div className=" text-sm truncate max-w-[80px]">
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
                        className="w-6 h-6"
                        src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/champion/${
                          participant.championName === 'FiddleSticks'
                            ? 'Fiddlesticks'
                            : participant.championName
                        }.png`}
                        alt=""
                      />
                      <Link
                        className="hover:text-blue-600"
                        to={`/EUW1/${participant.summonerName}/`}
                        target="_blank"
                      >
                        <div className=" text-sm truncate max-w-[80px]">
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
