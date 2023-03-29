import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import {
  fetchSummonerDataByName,
  fetchSummonerLeagueDetails,
  getLatestPathVersion,
} from '../services'
import {
  Server,
  SummonerBasic,
  SummonerLeague,
  SummonerRankedLeagues,
} from '../types'

import { IconByTier } from '../utilities/IconsComponent'
import unrankedIcon from '../assets/img/rank_Icon/unranked.webp'

export const SummonerPage = () => {
  const [summonerData, setSummonerData] = useState<
    SummonerBasic | null | undefined
  >(undefined)

  const [summonerLeagues, setSummonerLeagues] = useState<SummonerRankedLeagues>(
    {}
  )
  const [versionPath, setVersionPath] = useState('')

  const { summoner, server } = useParams()

  useEffect(() => {
    const getVersion = async () => {
      const version = await getLatestPathVersion()
      setVersionPath(version)
    }
    getVersion()
  }, [])

  useEffect(() => {
    if (summoner && server) {
      searchSummonerByName(summoner, server as Server)
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const searchSummonerByName = (name: string, region: Server) => {
    fetchSummonerDataByName(region, name).then((data) => {
      setSummonerData(data)
      if (data?.id) {
        fetchSummonerLeagueData(data.id, region)
      }
    })
  }

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
 console.log({summonerLeagues, summonerData})
  return (
    <>
      {summonerData === undefined && <div>Loading...</div>}
      {summonerData === null && (
        <div className="mt-20 text-center ">
          <h5 className="text-2xl font-bold">
            Its look like this player can't be find.Please check spelling.
          </h5>
          <p className="mt-10 text-sm text-gray-800 dark:text-white">
            Did you select the right server? Try searching for the summoner in
            another region
          </p>
        </div>
      )}

      {summonerData && (
        <>
          <Helmet>
            <title>
              {summonerData.name} League of Legends Performance Overview
            </title>
          </Helmet>
          <article className="p-4 flex gap-8 pt-12">
            <div className="w-36 relative ">
              <img
                className="w-full rounded-xl "
                src={`http://ddragon.leagueoflegends.com/cdn/${versionPath}/img/profileicon/${summonerData.profileIconId}.png`}
                alt="No image"
              />
              <div className="font-bold absolute bottom-0 bg-black w-full grid place-content-center text-white bg-opacity-30 rounded-b-xl">
                <span className=" font-normal p-1">
                  level {summonerData.summonerLevel}
                </span>
              </div>
            </div>
            <div>
              <h2 className=" text-2xl font-semibold">
                {summonerData.name} (
                {server !== undefined ? server.replace(/\d+/g, '') : ''})
              </h2>
            </div>
          </article>
          <h2 className="p-4 font-medium text-lg text-slate-600 dark:text-slate-300">
            Overview ↓
          </h2>
          <article className="p-4 grid-cols-5 gap-4 md:grid">
            <section className="col-span-2">
              <RankedComponent
                nameLeague="Ranked Solo"
                value={
                  summonerLeagues.RANKED_SOLO_5x5 !== undefined
                    ? summonerLeagues.RANKED_SOLO_5x5
                    : null
                }
              />
              <RankedComponent
                nameLeague="Ranked Flex"
                value={
                  summonerLeagues.RANKED_FLEX_SR !== undefined
                    ? summonerLeagues.RANKED_FLEX_SR
                    : null
                }
              />
            </section>

            <section className="col-span-3 ">
              <div className="mb-4 bg-white shadow rounded dark:bg-slate-700 border dark:border-slate-600">
                <div className="p-4 border-b-2 text-slate-700 font-medium text-base dark:text-slate-100 ">
                  Match History
                </div>

                <div className="p-4  text-slate-700 font-medium text-base dark:text-slate-100 ">
                  loading...
                </div>
              </div>
            </section>
          </article>
        </>
      )}
    </>
  )
}

const RankedComponent = ({
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
      <div className="p-4">
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
