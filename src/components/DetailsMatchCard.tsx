import { machine } from 'os'
import { MatchDTO, Participant, Rune, RuneReforged } from '../types'
import { summonerSpells } from '../utilities/getSummonerSpellName'
import { calculateKDA } from '../utilities/helpers/calculateKda'

interface DetailsMatchCardProps {
  summonerGameDetails: Participant
  versionPatch: string
  matchInfo: MatchDTO
  runes: {
    primarySlot: Rune
    subSlot: RuneReforged
  }
}

export const DetailsMatchCard = ({
  versionPatch,
  summonerGameDetails,
  runes,
  matchInfo,
}: DetailsMatchCardProps) => {
  const winTeamStats = matchInfo.info.teams.find((team) => team.win === true)
  const loseTeamStats = matchInfo.info.teams.find((team) => team.win === false)

  const getCsPerMinute = (cs: number, gameDuration: number): string => {
    const csPerMinuteFloat = parseFloat(
      (cs / (gameDuration / 60000)).toFixed(2)
    )
    const csPerMinuteRounded = Math.round(csPerMinuteFloat * 10) / 10
    const csPerMinuteScaled = (csPerMinuteRounded / 1000).toFixed(1)

    return csPerMinuteScaled
  }

  return (
    <>
      <div>
        <div className="flex pb-2">
          <img
            className="w-12 h-12 rounded-full"
            src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/champion/${
              summonerGameDetails.championName === 'FiddleSticks'
                ? 'Fiddlesticks'
                : summonerGameDetails.championName
            }.png`}
            alt=""
          />
          <div className="grid gap-1 pl-1 mr-1">
            <img
              className="w-6 h-6 rounded-md "
              src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/spell/${
                summonerSpells[summonerGameDetails.summoner1Id!]
              }.png`}
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
          <div className="grid gap-1 pr-1">
            {runes !== undefined ? (
              <>
                <img
                  className="w-6 h-6  bg-slate-700 rounded-full "
                  src={`https://ddragon.leagueoflegends.com/cdn/img/${runes.primarySlot.icon}`}
                  alt={summonerSpells[summonerGameDetails.summoner2Id!]}
                />
                <img
                  className="w-6 h-6 rounded-full"
                  src={`https://ddragon.leagueoflegends.com/cdn/img/${runes.subSlot.icon}`}
                  alt={summonerSpells[summonerGameDetails.summoner2Id!]}
                />
              </>
            ) : (
              <>
                <div>aaa</div>
              </>
            )}
          </div>
          <div className="pl-2 text-sm">
            <div className="font-medium text-zinc-700 dark:text-zinc-300">
              {summonerGameDetails.kills} /{' '}
              <span className="text-red-700 dark:text-red-400">
                {summonerGameDetails.deaths}
              </span>{' '}
              / {summonerGameDetails.assists}
            </div>
            <div className="text-sm">
              {calculateKDA(
                summonerGameDetails.kills!,
                summonerGameDetails.deaths!,
                summonerGameDetails.assists!
              )}
              KDA
            </div>
          </div>
        </div>

        {/* Icons items  */}
        <div className="flex">
          {Array.from({ length: 7 }).map((_, index) => {
            const itemValue = summonerGameDetails[`item${index}`]
            return itemValue !== 0 ? (
              <div className="w-7 " key={index}>
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
      <div className="text-xs">
        <div className=" text-red-700 dark:text-red-500">
          P/Kill{' '}
          {summonerGameDetails.win
            ? winTeamStats?.objectives.champion.kills !== 0
              ? Math.floor(
                  ((summonerGameDetails.kills + summonerGameDetails.assists) /
                    winTeamStats?.objectives.champion.kills!) *
                    100
                ) + '%'
              : '0%'
            : loseTeamStats?.objectives.champion.kills !== 0
            ? Math.floor(
                ((summonerGameDetails.kills + summonerGameDetails.assists) /
                  loseTeamStats?.objectives.champion.kills!) *
                  100
              ) + '%'
            : '0%'}
        </div>

        <div> Control Ward {summonerGameDetails.visionWardsBoughtInGame} </div>
        <div>
          CS{' '}
          {summonerGameDetails.totalMinionsKilled +
            summonerGameDetails.neutralMinionsKilled}{' '}
          (
          {getCsPerMinute(
            summonerGameDetails.totalMinionsKilled +
              summonerGameDetails.neutralMinionsKilled,
            matchInfo.info.gameDuration
          )}{' '}
          )
        </div>
      </div>
    </>
  )
}

export default DetailsMatchCard
