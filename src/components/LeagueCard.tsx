import { SummonerLeague } from "../types"
import { IconByTier } from '../utilities/IconsComponent'
import unrankedIcon from '../assets/img/rank_Icon/unranked.webp'


export const LeagueCard = ({
  nameLeague,
  value,
}: {
  nameLeague: string
  value: SummonerLeague | null
}) => {
  const calculateWinRate = (wins: number, losses: number) => {
    const totalGames = wins + losses
    const winRate = (wins / totalGames) * 100
    return winRate.toFixed() + '%'
  }

  return (
    <div className="mb-4 bg-white shadow rounded dark:bg-slate-700 border dark:border-slate-600">
      <div className="p-4 pb-0 text-slate-700 font-medium text-base dark:text-slate-100 ">
        {nameLeague}
      </div>
      <div className="p-2">
        {value === null ? (
          <div className="flex justify-between p-2 items-center">
            <div className="max-w-[35px]">
              <img src={unrankedIcon} alt="unranked" />
            </div>

            <div className="text-center font-medium text-sm  text-slate-600  dark:text-slate-300">
              Unranked
            </div>
          </div>
        ) : (
          <div className="text-center grid grid-cols-5">
            <div className="">
              <IconByTier tier={value.tier} />
            </div>

            <div className="pl-2">
              <div className="">
                {value.tier != 'CHALLENGER' && value.tier !== 'MASTER' ? (
                  <div className="flex space-x-1 font-semibold text-base">
                    <span>{value.tier} </span> <span>{value.rank}</span>
                  </div>
                ) : (
                  <div className="font-semibold text-base"> {value.tier} </div>
                )}
              </div>
              <div className="text-left text-sm text-slate-600 dark:text-slate-300">
                {' '}
                {(value.leaguePoints / 1000)
                  .toFixed(3)
                  .replace('.', ',')} LP{' '}
              </div>
            </div>

            <div className="text-right col-span-3 pr-4 text-sm ">
              <div>
                <span className=" text-green-600 dark:text-green-500">
                  {value.wins}W
                </span>{' '}
                <span className="text-red-600 dark:text-red-500">
                  {value.losses}L
                </span>
              </div>
              <div className=" text-slate-400 dark:text-slate-300">
                Win Rate {calculateWinRate(value.wins, value.losses)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
