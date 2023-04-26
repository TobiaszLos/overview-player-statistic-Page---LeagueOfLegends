import { Link } from 'react-router-dom'
import { MatchDTO, Participant, RuneReforged, Server } from '../types'
import { calculateKDA } from '../utilities/helpers/calculateKda'
import { summonerSpells } from '../utilities/getSummonerSpellName'
import { ProgressBar } from './ProgressBar'
import { getCsPerMinute } from '../utilities/helpers/getCsPerMinute'

interface CollapseParticipant {
  match: MatchDTO
  versionPatch: string
  summonerGameDetails: Participant
  server: Server
  start: number
  end: number
  part: 1 | 2
  runesInfo: RuneReforged[]
}

export const CollapseParticipant = ({
  match,
  versionPatch,
  summonerGameDetails,
  runesInfo,
  server,
  start,
  end,
  part,
}: CollapseParticipant) => {
  const winTeamStats = match.info.teams.find((team) => team.win === true)
  const loseTeamStats = match.info.teams.find((team) => team.win === false)

  const selectRunes = (participant: Participant) => {
    if (!participant) return

    const primaryStylePerks = participant.perks.styles[0]
    const subStylePerks = participant.perks.styles[1]

    const selectedPrimaryRune = runesInfo.find(
      (rune: RuneReforged) => rune.id === primaryStylePerks.style
    )

    const selectedSubStyleRune = runesInfo.find(
      (rune: RuneReforged) => rune.id === subStylePerks.style
    )

    if (!selectedPrimaryRune) return
    if (!selectedSubStyleRune) return

    const selectedPrimarySlot = selectedPrimaryRune.slots[0].runes.find(
      (slot) => slot.id === primaryStylePerks.selections[0].perk
    )

    if (!selectedPrimarySlot) return

    const filteredRunes = {
      primarySlot: selectedPrimarySlot,
      subSlot: selectedSubStyleRune,
    }

    return filteredRunes
  }

  const participantWithHighestDmg = () => {
    return match.info.participants.reduce((max, obj) => {
      if (obj.totalDamageDealtToChampions > max.totalDamageDealtToChampions) {
        return obj
      } else {
        return max
      }
    })
  }

  const kdaColor = (participant: Participant) => {
    const kda = calculateKDA(
      participant.kills,
      participant.deaths,
      participant.assists
    )

    let textColor = 'text-gray-400'

    if (Number(kda) > 5.0) {
      textColor = 'text-orange-400'
    } else if (Number(kda) > 4.0) {
      textColor = 'text-blue-400'
    } else if (Number(kda) > 3.0) {
      textColor = 'text-green-400'
    } else if (Number(kda) < 3.0) {
      textColor = 'text-slate-500'
    } else if (kda === 'Perfect') {
      textColor = 'text-orange-400'
    }

    return textColor
  }

  return (
    <div
      className={`text-xs  bg-slate-50  dark:bg-sky-700 dark:bg-opacity-10  ${
        part === 1 ? '' : ''
      }`}
    >
      <div
        className={`grid grid-cols-12 place-content-center  font-medium py-2  text-slate-500 dark:text-slate-400 ${
          match.info.participants[start].win
            ? 'border-b border-b-sky-200 border-opacity-70 dark:border-b-sky-900'
            : 'border-b border-b-red-200 border-opacity-80 dark:border-b-rose-900 dark:border-opacity-50'
        }`}
      >
        <div className="col-span-5 sm:col-span-3 ">
          {!match.info.participants[start].win ? (
            <span className="text-red-400 pl-4">Defeat</span>
          ) : (
            <span className="text-blue-400 pl-4">Victory </span>
          )}
        </div>
        <div className="col-span-3 sm:col-span-2  text-center ">KDA</div>
        <div className=" col-span-1 sm:col-span-1  text-center hidden sm:block">
          Damage
        </div>
        <div className=" col-span-1 sm:col-span-1 text-center hidden sm:block">
          Wards
        </div>
        <div className=" col-span-1 sm:col-span-1 text-center hidden sm:block">
          CS
        </div>
        <div className="col-span-4 sm:col-span-4 text-center">Items</div>
      </div>
      {match.info.participants.slice(start, end).map((participant, index) => {
        const select = selectRunes(participant)

        return (
          <div
            key={participant.puuid}
            className={`grid grid-cols-12 pl-2 pt-1 items-center text-slate-600 dark:text-slate-300  ${
              match.info.participants[start].win
                ? ` ${
                    summonerGameDetails.summonerName ===
                    participant.summonerName
                      ? 'bg-sky-200 bg-opacity-80  dark:bg-sky-600 dark:bg-opacity-20 '
                      : 'bg-sky-100 dark:bg-sky-900 dark:bg-opacity-20 '
                  } `
                : `  ${
                    summonerGameDetails.summonerName ===
                    participant.summonerName
                      ? 'bg-rose-400 bg-opacity-30  dark:bg-rose-400 dark:bg-opacity-20'
                      : 'bg-rose-200 bg-opacity-50  dark:bg-rose-800 dark:bg-opacity-20'
                  } `
            } `}
          >
            {/* ---------- Defeat/Victory COLUMN 1 ---------- */}
            <div
              className="flex col-span-5 sm:col-span-3 items-center"
              key={index}
            >
              <div className="flex">
                <div className=" relative ">
                  <div className=" absolute h-4 w-4 text-center text-[10px] text-white bg-slate-700 rounded-full bottom-[-1px] left-[-1px] ">
                    {participant.champLevel}
                  </div>
                  <img
                    className="w-9 h-9 rounded-full bottom-1"
                    src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/champion/${
                      participant.championName === 'FiddleSticks'
                        ? 'Fiddlesticks'
                        : participant.championName
                    }.png`}
                    alt=""
                  />
                </div>

                <div className="pl-1  flex flex-col gap-1">
                  <img
                    className="w-4 h-4 rounded-md "
                    src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/spell/${
                      summonerSpells[participant.summoner1Id!]
                    }.png`}
                    alt={summonerSpells[participant.summoner1Id!]}
                  />

                  <img
                    className="w-4 h-4 rounded-md"
                    src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/spell/${
                      summonerSpells[participant.summoner2Id!]
                    }.png`}
                    alt={summonerSpells[participant.summoner2Id!]}
                  />
                </div>

                {!!runesInfo.length && (
                  <div className="pl-1  flex flex-col gap-1">
                    <img
                      className="w-4 h-4  bg-slate-700 rounded-full"
                      src={`https://ddragon.leagueoflegends.com/cdn/img/${
                        select!.primarySlot.icon
                      }`}
                      alt={summonerSpells[participant.summoner2Id!]}
                    />
                    <img
                      className="w-4 h-4 rounded-full" // runes.subSlot.icon
                      src={`https://ddragon.leagueoflegends.com/cdn/img/${
                        select!.subSlot.icon
                      }`}
                      alt={summonerSpells[participant.summoner2Id!]}
                    />
                  </div>
                )}
              </div>
              <Link
                className={` font-medium pl-2 truncate  w-24   `}
                to={`/${server}/${participant.summonerName}/`}
                target="_blank"
              >
                <div className="pl-1 text-slate-900  truncate max-w-[100px] hover:text-blue-300 dark:text-blue-200 hover:dark:text-blue-400">
                  {participant.summonerName}
                </div>
              </Link>
            </div>
            {/* ---------- KDA COLUMN 2 ---------- */}
            <div className="col-span-2 sm:col-span-2 text-center  ">
              <div className=" text-slate-700 opacity-80 dark:text-slate-100 ">
                {participant.kills}/{participant.deaths}/{participant.assists}{' '}
                <span className="hidden md:inline-block ">
                  (
                  {participant.win
                    ? winTeamStats?.objectives.champion.kills !== 0
                      ? Math.floor(
                          ((participant.kills + participant.assists) /
                            winTeamStats?.objectives.champion.kills!) *
                            100
                        ) + '%'
                      : '0%'
                    : loseTeamStats?.objectives.champion.kills !== 0
                    ? Math.floor(
                        ((participant.kills + participant.assists) /
                          loseTeamStats?.objectives.champion.kills!) *
                          100
                      ) + '%'
                    : '0%'}
                  )
                </span>
              </div>
              <div>
                <span
                  className={`font-medium ${kdaColor(participant)}
                   `}
                >
                  {calculateKDA(
                    participant.kills,
                    participant.deaths,
                    participant.assists
                  )}
                </span>
              </div>
            </div>
            {/* ---------- DMG COLUMN 3   MOBILE DISABLED  ---------- */}
            <div className="col-span-1 sm:col-span-1 hidden sm:block">
              <div className="mb-1">
                {participant.totalDamageDealtToChampions / 1000}
              </div>
              <ProgressBar
                dmg={participant.totalDamageDealtToChampions / 1000}
                totalDmg={
                  participantWithHighestDmg().totalDamageDealtToChampions / 1000
                }
              />
            </div>
            {/* ---------- Wards COLUMN 4  MOBILE DISABLED ---------- */}
            <div className="col-span-1 sm:col-span-1  hidden sm:flex  justify-center">
              {participant.wardsPlaced}
            </div>
            {/* ---------- CS COLUMN 5 DISABLED ---------- */}
            <div className="col-span-1 sm:col-span-1 items-center flex-col  hidden sm:flex ">
              <div className="text-slate-500 dark:text-slate-300">
                {participant.totalMinionsKilled +
                  participant.neutralMinionsKilled}{' '}
              </div>
              <div className="text-slate-500 dark:text-slate-400">
                {getCsPerMinute(
                  participant.totalMinionsKilled +
                    participant.neutralMinionsKilled,
                  match.info.gameDuration
                )}
                /m
              </div>
            </div>
            {/* ---------- Items COLUMN 6  ---------- */}
            <div className="col-span-5 sm:col-span-4  flex justify-center">
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
