import { ParticipantDTO } from '../types'
import { summonerSpells } from '../utilities/getSummonerSpellName'
import { calculateKDA } from '../utilities/helpers/calculateKda'

interface DetailsMatchCardProps {
  summonerGameDetails: ParticipantDTO
  versionPatch: string
}

export const DetailsMatchCard = ({
  versionPatch,
  summonerGameDetails,
}: DetailsMatchCardProps) => {
  return (
    <section className="col-span-2">
      <div className="flex pb-2">
        <img
          className="w-12 h-12 rounded-md"
          src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/champion/${summonerGameDetails.championName}.png`}
          alt=""
        />
        <div className="pl-1">
          <img
            className="w-6 h-6 rounded-md pb-1"
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
        <div className="pl-2">
          <div className="font-medium text-zinc-700 dark:text-zinc-300">
            {summonerGameDetails.kills} /{' '}
            <span className="text-red-700 dark:text-red-400">
              {summonerGameDetails.deaths}{' '}
            </span>
            /{summonerGameDetails.assists}{' '}
          </div>
          <div className="text-sm">
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
    </section>
  )
}

export default DetailsMatchCard
