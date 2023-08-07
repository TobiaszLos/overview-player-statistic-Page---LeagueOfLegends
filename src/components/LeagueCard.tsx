import { SummonerLeague } from '../types'
import { IconByTier } from '../utilities/IconsComponent'
import unrankedIcon from '../assets/img/rank_Icon/unranked.webp'
import { ProgressBar } from '../utilities/ProgressBar'
import { calculateWinRate } from '../utilities/helpers/calculateWinRate'

export const LeagueCard = ({
  nameLeague,
  value,
  customCss,
}: {
  nameLeague: string
  value: SummonerLeague | null
  customCss?: string
}) => {
  return (
    <div
      className={`mb-1 bg-white bg-opacity-75 ${
        customCss ? customCss : ''
      }  rounded-md dark:bg-sky-900 dark:bg-opacity-20  `}
    >
      <div className="p-4 pb-0 text-slate-700 font-medium text-sm  dark:text-slate-100 ">
        {nameLeague}
      </div>
      <div className="p-2">
        {value === null ? (
          <div className="flex justify-between p-2 items-center">
            <div className="max-w-[35px]">
              <img src={unrankedIcon} alt="unranked" />
            </div>

            <div className="text-center font-medium  text-slate-600 text-sm  dark:text-slate-300">
              Unranked
            </div>
          </div>
        ) : (
          <div className="text-center grid grid-cols-5">
            <div>
              <IconByTier tier={value.tier} />
            </div>

            <div className="pl-2">
              <div className="text-sm  ">
                {value.tier != 'CHALLENGER' && value.tier !== 'MASTER' ? (
                  <div className="flex space-x-1 font-semibold capitalize">
                    <span>{value.tier.toLowerCase()} </span>{' '}
                    <span>{value.rank}</span>
                  </div>
                ) : (
                  <div className="font-semibold capitalize text-left ">
                    {' '}
                    {value.tier.toLowerCase()}{' '}
                  </div>
                )}
              </div>
              <div className="text-left text-xs text-slate-600 dark:text-slate-300">
                {value.leaguePoints > 999
                  ? (value.leaguePoints / 1000).toFixed(3).replace('.', ',')
                  : value.leaguePoints}{' '}
                LP
              </div>
            </div>

            <div className="text-right col-span-3 pr-4 text-sm ">
              <div>
                <span className=" text-blue-600 dark:text-blue-500">
                  {value.wins}W
                </span>{' '}
                <span className="text-red-600 dark:text-red-500">
                  {value.losses}L
                </span>
              </div>
              <div className="w-full flex justify-end ">
                <div className="w-24 my-1">
                  <ProgressBar wins={value.wins} losses={value.losses} />
                </div>
              </div>
              <div className=" text-slate-400 text-xs  dark:text-slate-300">
                Win Rate {calculateWinRate(value.wins, value.losses)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
