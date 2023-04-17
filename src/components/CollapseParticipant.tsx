import { Link } from 'react-router-dom'
import { MatchDTO, Participant, RuneReforged, Server } from '../types'
import { calculateKDA } from '../utilities/helpers/calculateKda'
import { summonerSpells } from '../utilities/getSummonerSpellName'
import { ProgressBar } from './ProgressBar'

interface CollapseParticipant {
  match: MatchDTO
  versionPatch: string
  server: Server
  start: number
  end: number
  runesInfo: RuneReforged[]
}

export const CollapseParticipant = ({
  match,
  versionPatch,
  runesInfo,
  server,
  start,
  end,
}: CollapseParticipant) => {
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

  return (
    <div
      className={`grid grid-rows-5 col-start-1 col-end-2 text-xs  mb-4 bg-slate-50 dark:bg-sky-700 dark:bg-opacity-10 `}
    >
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
        const select = selectRunes(participant)

        return (
          <div
            key={participant.puuid}
            className={`grid grid-cols-12 py-1 pl-4 items-center text-slate-600 dark:text-slate-300 ${
              match.info.participants[start].win
                ? 'bg-sky-100 dark:bg-sky-900 dark:bg-opacity-20'
                : 'bg-rose-200 bg-opacity-50  dark:bg-rose-800 dark:bg-opacity-20 '
            } `}
          >
            <div className="flex col-span-3 items-center" key={index}>
              <div className="flex">
                <img
                  className="w-11 h-11  "
                  src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/champion/${
                    participant.championName === 'FiddleSticks'
                      ? 'Fiddlesticks'
                      : participant.championName
                  }.png`}
                  alt=""
                />
                <div className="pl-1">
                  <img
                    className="w-6 h-6 rounded-md pb-1"
                    src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/spell/${
                      summonerSpells[participant.summoner1Id!]
                    }.png`}
                    alt={summonerSpells[participant.summoner1Id!]}
                  />

                  <img
                    className="w-6 h-6 rounded-md"
                    src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/spell/${
                      summonerSpells[participant.summoner2Id!]
                    }.png`}
                    alt={summonerSpells[participant.summoner2Id!]}
                  />
                </div>

                {!!runesInfo.length && (
                  <div>
                    <img
                      className="w-6 h-6  bg-slate-700 rounded-full" // runes.primarySlot.icon
                      src={`https://ddragon.leagueoflegends.com/cdn/img/${
                        select!.primarySlot.icon
                      }`}
                      alt={summonerSpells[participant.summoner2Id!]}
                    />
                    <img
                      className="w-5 h-5 rounded-full" // runes.subSlot.icon
                      src={`https://ddragon.leagueoflegends.com/cdn/img/${
                        select!.subSlot.icon
                      }`}
                      alt={summonerSpells[participant.summoner2Id!]}
                    />
                  </div>
                )}
              </div>

              <Link
                className="hover:text-blue-600 "
                to={`/${server}/${participant.summonerName}/`}
                target="_blank"
              >
                <div className="pl-1 text-slate-900 dark:text-slate-200  truncate max-w-[80px]">
                  {participant.summonerName}
                </div>
              </Link>
            </div>
            <div className=" col-span-2 text-center ">
              <div>
                {participant.kills} / {participant.deaths} /
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
              <div className='mb-1'>{participant.totalDamageDealtToChampions / 1000}</div>
              <ProgressBar
                dmg={participant.totalDamageDealtToChampions / 1000}
                totalDmg={
                  participantWithHighestDmg().totalDamageDealtToChampions / 1000
                }
              />
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
