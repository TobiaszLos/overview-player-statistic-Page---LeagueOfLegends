import { timeFormat } from '../utilities/helpers/timeFormat'
import { ChampionMasteryStats } from '../types'

export const MasteryChampionCard = ({
  versionPatch,
  customCss,
  champions,
}: {
  champions: ChampionMasteryStats[]
  versionPatch: string
  customCss?: string
}) => {


   console.log(champions, 'champions')
  return (
    <div
      className={`mb-4 pb-2 bg-white bg-opacity-75 ${
        customCss ? customCss : ''
      }  rounded-xl dark:bg-sky-900 dark:bg-opacity-20  `}
    >
      <div className="p-4 pb-4  text-slate-700 font-medium text-sm dark:text-slate-100 ">
        Champions Mastery
      </div>

      <div>
        <div className=" pl-4 grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 mb-4 font-medium text-xs ">
          <div className=" "></div>

          <div className=" ">Name</div>
          <div className="  ">Level</div>
          <div className=" ">Points</div>
          <div className="hidden sm:block lg:hidden">last played</div>
        </div>

        {!!champions?.length && (
          <div>
            {champions.map((champ) => (
              <div
                key={champ.championId}
                className="pl-4 grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 mb-2 text-xs  text-slate-500 dark:text-slate-300 font-medium"
              >
                <div className="">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/champion/${
                      champ.championName === 'FiddleSticks'
                        ? 'Fiddlesticks'
                        : champ.championName
                    }.png`}
                    alt=""
                  />
                </div>

                <div className="flex items-center ">{champ.championName}</div>
                <div className=" flex items-center pl-3 ">
                  {champ.championLevel}
                </div>
                <div className=" flex items-center ">
                  {champ.championPoints / 1000}
                </div>
                <div className="  items-center hidden sm:block lg:hidden ">
                  <div className="">
                    {timeFormat(champ.lastPlayTime, 'fromNow')}
                  </div>
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
