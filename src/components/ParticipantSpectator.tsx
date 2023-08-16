import { useEffect, useState } from 'react'
import {
  ChampionData,
  ParticipantSpectatorType,
  Rune,
  RuneReforged,
  Server,
  SummonerLeague,
  SummonerRankedLeagues,
} from '../types'
import { summonerSpells } from '../utilities/getSummonerSpellName'
import { findChampionNameByKey } from '../utilities/helpers/findChampionNameByKey'
import { fetchSummonerLeagueDetails } from '../services'
import { calculateWinRate } from '../utilities/helpers/calculateWinRate'
import { IconByTier } from '../utilities/IconsComponent'
import { Link } from 'react-router-dom'

interface ParticipantSpectatorProps {
  teamId: number
  championsData: Record<string, ChampionData>
  participant: ParticipantSpectatorType
  selectRunes: (participant: ParticipantSpectatorType) =>
    | {
        primarySlot: Rune
        subSlot: RuneReforged
      }
    | undefined

  team: 'red' | 'blue'
}

export const ParticipantSpectator = ({
  teamId,
  championsData,
  participant,
  selectRunes,
  team,
}: ParticipantSpectatorProps) => {
  const [summonerLeagues, setSummonerLeagues] = useState<SummonerRankedLeagues>(
    {}
  )

  const versionPatch = '13.13.1'
  const regionEUW1 = 'EUW1'

  console.log(participant)

  useEffect(() => {
    fetchSummonerLeagueData(participant.summonerId, regionEUW1)
  }, [])

  const fetchSummonerLeagueData = async (
    summonerId: string,
    region: Server
  ) => {
    await fetchSummonerLeagueDetails(summonerId, region).then((data) => {
      const transformData = () => {
        return data.reduce((acc, currentVal: SummonerLeague) => {
          return {
            ...acc,
            [currentVal.queueType]: currentVal,
          }
        }, {})
      }

      setSummonerLeagues(transformData() as SummonerRankedLeagues)
    })
  }

  return (
    <div className="p-1 grid grid-cols-3 self-center ">
      <div className="grid grid-flow-col auto-cols-max gap-1">
        <div>
          <img
            className="w-9 h-9 rounded-full bottom-1 m-0 "
            src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/champion/${findChampionNameByKey(
              championsData,
              participant.championId.toString()
            )}.png`}
            alt=""
          />
        </div>

        <div className="grid grid-cols-2 grid-rows-2 self-center gap-1">
          <img
            className="w-4 h-4 rounded-md "
            src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/spell/${
              summonerSpells[participant.spell1Id!]
            }.png`}
            alt={summonerSpells[participant.spell1Id!]}
          />

          <img
            className="w-4 h-4 rounded-md"
            src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/spell/${
              summonerSpells[participant.spell2Id!]
            }.png`}
            alt={summonerSpells[participant.spell2Id!]}
          />
          {selectRunes(participant)?.primarySlot.icon && (
            <>
              <img
                className="w-4 h-4  bg-slate-700 rounded-full"
                src={`https://ddragon.leagueoflegends.com/cdn/img/${
                  selectRunes(participant)!.primarySlot.icon
                }`}
                alt="icon"
              />
              <img
                className="w-4 h-4 rounded-full" // runes.subSlot.icon
                src={`https://ddragon.leagueoflegends.com/cdn/img/${
                  selectRunes(participant)!.subSlot.icon
                }`}
                alt="icon"
              />
            </>
          )}
        </div>
        <div
          className={`${
            team === 'red' ? ' text-red-400' : 'text-blue-400'
          } text-center text-xs md:text-sm flex items-center max-w-[55px] md:max-w-md`}
        >
          <Link className="truncate" to={`/EUW1/${participant.summonerName}`}>
            {' '}
            {participant.summonerName}
          </Link>
        </div>
      </div>
      {summonerLeagues.RANKED_SOLO_5x5 !== undefined ? (
        <>
          <div className="flex items-center gap-1 text-xs font-medium justify-end md:justify-start ">
            <div className="w-8">
              <IconByTier tier={summonerLeagues.RANKED_SOLO_5x5.tier} />
            </div>

            <div className="pr-4">
              <div className="hidden md:flex gap-1">
                <span className="hidden md:block ">
                  {summonerLeagues.RANKED_SOLO_5x5.tier}
                </span>{' '}
                {['CHALLENGER', 'GRANDMASTER', 'MASTER'].includes(
                  summonerLeagues.RANKED_SOLO_5x5.tier
                )
                  ? null
                  : summonerLeagues.RANKED_SOLO_5x5.rank}
              </div>
              <span className="text-xs font-normal text-gray-600 dark:text-gray-400">
                {summonerLeagues.RANKED_SOLO_5x5.leaguePoints}LP
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 font-medium text-sm">
            <div
              className={`${
                parseFloat(
                  calculateWinRate(
                    summonerLeagues.RANKED_SOLO_5x5.wins,
                    summonerLeagues.RANKED_SOLO_5x5.losses
                  )
                ) >= 50
                  ? ' text-green-400'
                  : 'text-red-400'
              } `}
            >
              {calculateWinRate(
                summonerLeagues.RANKED_SOLO_5x5.wins,
                summonerLeagues.RANKED_SOLO_5x5.losses
              )}
            </div>
            <div className=" text-gray-400 text-xs">
              (
              {summonerLeagues.RANKED_SOLO_5x5.wins +
                summonerLeagues.RANKED_SOLO_5x5.losses}{' '}
              Played games)
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center">-</div>
          <div className="flex items-center">-</div>
        </>
      )}
    </div>
  )
}
