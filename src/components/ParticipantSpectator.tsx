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
    <div className="p-1">
      <div
        className={`${
          team === 'red' ? ' bg-red-400' : 'bg-blue-400'
        } text-center`}
      >
        {participant.summonerName}
      </div>

      <div className="flex">
        <div>
          <img
            className="w-9 h-9 rounded-full bottom-1"
            src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/champion/${findChampionNameByKey(
              championsData,
              participant.championId.toString()
            )}.png`}
            alt=""
          />
        </div>
        <div>
          <div className="  flex gap-1">
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
          </div>

          {selectRunes(participant)?.primarySlot.icon && (
            <div className="pl-1  flex">
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
            </div>
          )}
        </div>
      </div>
      {summonerLeagues.RANKED_SOLO_5x5 !== undefined && (
        <div>
          <div>
            <span>{summonerLeagues.RANKED_SOLO_5x5.tier}</span>{' '}
            <span>{summonerLeagues.RANKED_SOLO_5x5.leaguePoints}LP</span>
          </div>

          <div>
            Winratio:{' '}
            <span
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
              )}{' '}
            </span>
            (
            {summonerLeagues.RANKED_SOLO_5x5.wins +
              summonerLeagues.RANKED_SOLO_5x5.losses}
            Played)
          </div>
        </div>
      )}
    </div>
  )
}
