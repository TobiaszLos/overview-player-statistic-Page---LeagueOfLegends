import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import {
  fetchMatchesList,
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

import { Loading } from '../components/Loading'
import { LeagueCard } from '../components/LeagueCard'
import { ListMatchHistory } from '../components/ListMatchHistory'
import { getRegion } from '../utilities/regionSwitcher'

export const SummonerPage = () => {
  const [summonerData, setSummonerData] = useState<
    SummonerBasic | null | undefined
  >(undefined)
  const [summonerLeagues, setSummonerLeagues] = useState<SummonerRankedLeagues>(
    {}
  )

  const [historyList, setHistoryList] = useState([])

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

  const searchSummonerByName = async (name: string, region: Server) => {
    try {
      const data = await fetchSummonerDataByName(region, name)
      setSummonerData(data)
      if (data?.id) {
        await fetchSummonerLeagueData(data.id, region)
        await fetchMatchHistory(data.puuid, server as Server)
      }
    } catch (error) {
      console.log(error)
    }
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

  const fetchMatchHistory = async (puuid: string, server: Server) => {
    const list = await fetchMatchesList(puuid, getRegion(server))
    setHistoryList(list)
  }

  return (
    <>
      {summonerData === undefined && (
        <div className="grid content-center justify-center">
          <Loading />
        </div>
      )}
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
              <LeagueCard
                nameLeague="Ranked Solo"
                value={
                  summonerLeagues.RANKED_SOLO_5x5 !== undefined
                    ? summonerLeagues.RANKED_SOLO_5x5
                    : null
                }
              />
              <LeagueCard
                nameLeague="Ranked Flex"
                value={
                  summonerLeagues.RANKED_FLEX_SR !== undefined
                    ? summonerLeagues.RANKED_FLEX_SR
                    : null
                }
              />
            </section>

            <section className="col-span-3 ">
              {!!historyList.length && (
                <ListMatchHistory
                  historyList={historyList}
                  summonerName={summonerData.name}
                />
              )}
            </section>
          </article>
        </>
      )}
    </>
  )
}
