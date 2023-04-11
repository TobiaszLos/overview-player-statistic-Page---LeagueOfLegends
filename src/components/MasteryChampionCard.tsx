import { useEffect, useState } from 'react'
import { fetchChampionsMasteriesWithName } from '../services'
import { timeFormat } from '../utilities/helpers/timeFormat'
import { ChampionMasteryStats } from '../types'


export const MasteryChampionCard = ({
  summonerId,
  versionPatch,
}: {
  summonerId: string
  versionPatch: string
}) => {
  const [champions, setchampions] = useState<ChampionMasteryStats[]>()

  useEffect(() => {
    const fechChampions = async () => {
      console.log('test')
      const championsFetched = await fetchChampionsMasteriesWithName(summonerId)
      console.log(championsFetched, 'champion ch')
      // setchampions(championsFetched)
      setchampions(championsFetched)
      console.log('jungle', summonerId)
    }
    fechChampions()
  }, [])
  console.log(champions, 'aa')
  return (
    <div className="mb-4 pb-2 bg-white bg-opacity-75   rounded-xl dark:bg-sky-900 dark:bg-opacity-20  ">
      <div className="p-4 pb-4 text-slate-700 font-medium text-base dark:text-slate-100 ">
        Champions Mastery
      </div>

      <div>
        <div className="grid grid-cols-12 mb-4 font-medium text-sm " >
          <div className=" col-span-3"></div>

          <div className=" col-span-2 ">Name</div>
          <div className=" col-span-2 text-left">Level</div>
          <div className=" col-span-2 text-lefty">Points</div>
          <div className=" col-span-3 text-left ">last played</div>
        </div>

        {!!champions?.length && (
          <div>
            {champions.map((champ) => (
              <div className="grid grid-cols-12 mb-2 text-sm  text-slate-700 dark:text-slate-300">
                <div className=" col-span-3 flex justify-center">
                  <img
                    className="w-12 h-12 "
                    src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/champion/${
                      champ.championName === 'FiddleSticks'
                        ? 'Fiddlesticks'
                        : champ.championName
                    }.png`}
                    alt=""
                  />
                </div>

                <div className=" col-span-2 ">{champ.championName}</div>
                <div className=" col-span-2 text-left">{champ.championLevel}</div>
                <div className=" col-span-2 text-left">
                  {champ.championPoints / 1000}
                </div>
                <div className=" col-span-3 text-left  ">
                  <div className=''>{timeFormat(champ.lastPlayTime, 'fromNow')}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default MasteryChampionCard
