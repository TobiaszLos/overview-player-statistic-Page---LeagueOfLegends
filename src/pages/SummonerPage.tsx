import { FormEvent, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import {
  fetchMatchesList,
  fetchRunesReforged,
  fetchSummonerDataByName,
  fetchSummonerLeagueDetails,
} from '../services'
import {
  MatchDTO,
  RuneReforged,
  Server,
  SummonerBasic,
  SummonerLeague,
  SummonerRankedLeagues,
} from '../types'

import { Loading } from '../components/Loading'
import { LeagueCard } from '../components/LeagueCard'

import { getRegion } from '../utilities/regionSwitcher'
import { MatchCard } from '../components/MatchCard'
import MasteryChampionCard from '../components/MasteryChampionCard'

import { BiCaretDown } from 'react-icons/bi'
import { MdHistory } from 'react-icons/md'
import { TopSearchBar } from '../components/MiniSearchBar'

const PAGE_SIZE = 6

export const SummonerPage = ({ versionPatch }: { versionPatch: string }) => {
  const [summonerData, setSummonerData] = useState<
    SummonerBasic | null | undefined
  >(undefined)
  const [summonerLeagues, setSummonerLeagues] = useState<SummonerRankedLeagues>(
    {}
  )
  const [historyList, setHistoryList] = useState<MatchDTO[]>([])
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)

  const [runesInfo, setRunesInfo] = useState<RuneReforged[]>()

  const { summoner, server } = useParams()

  const [seachedSummoner, setSearcherSummoner] = useState('') // MODAL SEARCH

  const navigate = useNavigate()

  useEffect(() => {
    if (summoner && server) {
      searchSummonerByName(summoner, server as Server) // RUN ALL
    }
  }, [seachedSummoner])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    getRunesFromAssetsApi()
  }, [])

  const getRunesFromAssetsApi = async () => {
    const getRunesInfo = await fetchRunesReforged()

    setRunesInfo(getRunesInfo!)
  }

  const searchSummonerByName = async (name: string, region: Server) => {
    try {
      const data = await fetchSummonerDataByName(region, name)
      setSummonerData(data)
      if (data?.id) {
        await fetchSummonerLeagueData(data.id, region)

        // GET HISTORY LIST OF GAMES
        const list = await fetchMatchesList(
          data.puuid,
          getRegion(server as Server),
          PAGE_SIZE,
          pageNumber * PAGE_SIZE
        )
        setHistoryList(list)
        setPageNumber((prevPageNumber) => prevPageNumber + 1) // pagination
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

  const handleLoadMore = async () => {
    if (!summonerData?.puuid) return
    setIsLoading(true)
    const list = await fetchMatchesList(
      summonerData?.puuid,
      getRegion(server as Server),
      PAGE_SIZE,
      pageNumber * PAGE_SIZE
    )
    setIsLoading(false)
    setHistoryList((prevList) => [...prevList, ...list])
    setPageNumber((prev) => prev + 1)

    if (historyList.length < PAGE_SIZE) {
      setHasNextPage(false)
    }
  }
  //event: FormEvent<HTMLFormElement>
  const handleUpdateSearchFromModal = (name: string) => {
    // UPDATE PAGE
    //event.preventDefault()

    setSearcherSummoner(name)
    navigate(`/EUW1/${name}`)
  }

  return (
    <>
      {summonerData === undefined && (
        <div className="absolute top-1/2 left-1/2">
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

          <TopSearchBar onSearch={handleUpdateSearchFromModal} />

          <article className="p-4 flex gap-8 pt-0">
            <div className="w-36 relative ">
              <img
                className="w-full rounded-xl "
                src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/profileicon/${summonerData.profileIconId}.png`}
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
          <h2 className="p-4 font-medium tracking-wide text-slate-700  dark:text-slate-300 ">
            <span>Overview </span>
          </h2>
          <article className="p-4 lg:grid lg:grid-cols-9 gap-2">
            <section className="col-span-3  sm:grid sm:grid-cols-4  lg:flex lg:flex-col  sm:bg-transparent lg:bg-transparent">
              <LeagueCard
                customCss="sm:col-span-2 lg:col-span-1 sm:mr-1 lg:mr-0"
                nameLeague="Ranked Solo"
                value={
                  summonerLeagues.RANKED_SOLO_5x5 !== undefined
                    ? summonerLeagues.RANKED_SOLO_5x5
                    : null
                }
              />
              <LeagueCard
                customCss="sm:col-span-2 lg:col-span-1"
                nameLeague="Ranked Flex"
                value={
                  summonerLeagues.RANKED_FLEX_SR !== undefined
                    ? summonerLeagues.RANKED_FLEX_SR
                    : null
                }
              />
              <MasteryChampionCard
                customCss="sm:col-span-4 lg:col-span-1"
                server={server as Server}
                summonerId={summonerData.id}
                versionPatch={versionPatch}
              />
            </section>

            <section className="col-span-6">
              <div className="mb-2 p-2  flex items-center border-l-4 border-r-4 border-slate-700 dark:border-sky-800 dark:border-opacity-60  bg-white bg-opacity-75  rounded-md dark:bg-sky-900 dark:bg-opacity-20 text-slate-700  text-base dark:text-slate-200  ">
                {/* <MdHistory /> */}
                <div className="pl-2 text-sm tracking-wider font-medium">
                  Matches
                </div>
              </div>

              {historyList.length > 0 ? (
                <>
                  {historyList.map((match) => (
                    <MatchCard
                      runesInfo={runesInfo!}
                      key={match.metadata.matchId}
                      match={match}
                      summonerName={summoner!}
                      versionPatch={versionPatch}
                      server={server as Server}
                    />
                  ))}
                  {hasNextPage && (
                    <button
                      className="w-full border font-medium py-2 text-sm rounded-md text-slate-600 hover:border-opacity-70 border-slate-400  dark:bg-transparent dark:border-sky-600 dark:hover:border-sky-700 dark:border-opacity-50 dark:text-gray-300   hover:border-slate-600"
                      onClick={handleLoadMore}
                    >
                      {isLoading ? (
                        <Loading />
                      ) : (
                        <div className="flex justify-center">
                          <span className="mr-1">Lead More</span>
                          <BiCaretDown size={'1.2rem'} />
                        </div>
                      )}
                    </button>
                  )}
                </>
              ) : (
                <Loading />
              )}
            </section>
          </article>
        </>
      )}
    </>
  )
}
