import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import {
  fetchChampionsMasteriesWithName,
  fetchMatchesList,
  fetchRunesReforged,
  fetchSummonerDataByName,
  fetchSummonerLeagueDetails,
  fetchSummonerSpectatorData,
} from '../services'
import {
  ChampionMasteryStats,
  MatchDTO,
  RuneReforged,
  Server,
  SpectatorData,
  SummonerBasic,
  SummonerLeague,
  SummonerRankedLeagues,
} from '../types'

import { Loading } from '../utilities/Loading'
// import { LeagueCard } from '../components/LeagueCard'

import { getRegion } from '../utilities/regionSwitcher'
// import { MatchCard } from '../components/MatchCard'
// import MasteryChampionCard from '../components/MasteryChampionCard'

// import { BiCaretDown } from 'react-icons/bi'
import { TopSearchBar } from '../components/MiniSearchBar'

import { AiOutlineWifi } from 'react-icons/ai'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { GrFavorite } from 'react-icons/gr'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'

import useLocalStorageFavorites from '../hooks/useLocalStorageFavorites'

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

  const [seachedSummoner, setSearcherSummoner] = useState('') //UPDATE PAGE FROM CHILD
  const [seachedSummonerRegion, setSearcherSummonerRegion] = useState<Server>() //UPDATE PAGE FROM CHILD

  const [champions, setchampions] = useState<ChampionMasteryStats[]>()

  const [live, setLive] = useState(false)
  const [gameData, setGameData] = useState<SpectatorData | undefined>()

  const {
    favorites,
    saveFavoriteToLocalStorage,
    removeFavoriteFromLocalStorage,
  } = useLocalStorageFavorites('Profiles')

  const navigate = useNavigate()

  useEffect(() => {
    if (summoner && server) {
      searchSummonerByName(summoner, server as Server) // RUN ALL
    }
  }, [seachedSummoner, seachedSummonerRegion])

  useEffect(() => {
    if (summonerData) window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    getRunesFromAssetsApi()
  }, [])

  const getRunesFromAssetsApi = async () => {
    const getRunesInfo = await fetchRunesReforged()

    setRunesInfo(getRunesInfo!)
  }

  const test = (profiles: string, newProfile: string) => {
    const listOfProfiles = [...profiles, newProfile]
    return listOfProfiles
  }

  const spectator = async (server: Server, summonerData: SummonerBasic) => {
    const spectatorData = await fetchSummonerSpectatorData(
      server,
      summonerData.id
    )

    // console.log(spectatorData, 'spectatorData')

    if (spectatorData) {
      setLive(true)
      setGameData(spectatorData)
    } else {
      setLive(false)
      setGameData(undefined)
    }
  }

  const searchSummonerByName = async (name: string, region: Server) => {
    try {
      const data = await fetchSummonerDataByName(region, name)
      setSummonerData(data)
      if (data?.id) {
        await fetchSummonerLeagueData(data.id, region)
        await spectator(server as Server, data)
        // GET HISTORY LIST OF GAMES

        const list = await fetchMatchesList(
          data.puuid,
          getRegion(server as Server),
          PAGE_SIZE,
          pageNumber * PAGE_SIZE
        )
        setHistoryList(list)

        setPageNumber((prevPageNumber) => prevPageNumber + 1)

        fechChampionsMastery(data.id, region)
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

  const handleUpdateSearchFromModal = (name: string, server: Server) => {
    setSearcherSummoner(name)
    setSearcherSummonerRegion(server)
    navigate(`/${server}/${name}`)
  }

  const fechChampionsMastery = async (summonerId: string, server: Server) => {
    const championsFetched = await fetchChampionsMasteriesWithName(
      summonerId,
      server,
      7
    )

    setchampions(championsFetched)
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

  // const handleToggleFavorite = (name: string) => {
  //   const summonerName = name

  //   if (favorites.includes(summonerName)) {
  //     removeFavoriteFromLocalStorage(summonerName)
  //   } else {
  //     saveFavoriteToLocalStorage(summonerName)
  //   }
  // }

  const handleToggleFavorite = (name: string, server: string) => {
    const summonerName = name

    const isSummonerFavorite = favorites.some(
      (fav) => fav.name === summonerName
    )

    if (isSummonerFavorite) {
      removeFavoriteFromLocalStorage(summonerName)
    } else {
      saveFavoriteToLocalStorage(summonerName, server)
    }
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
            <div className="flex flex-col justify-between">
              <h2 className=" text-2xl font-semibold">
                {summonerData.name} (
                {server !== undefined ? server.replace(/\d+/g, '') : ''})
              </h2>
              <div
                className={`${
                  favorites.some((fav) => fav.name === summonerData.name)
                    ? ' bg-red-500 dark:bg-red-700'
                    : ' bg-gray-600 dark:bg-gray-700'
                } text-white text-sm cursor-pointer hover:opacity-90   rounded inline-flex justify-center items-center py-2 px-4`}
                onClick={() => handleToggleFavorite(summonerData.name, server!)}
              >
                {favorites.some((fav) => fav.name === summonerData.name) ? (
                  <>
                    <FaBookmark /> <span className="pl-2">Bookmarked</span>{' '}
                  </>
                ) : (
                  <>
                    <FaRegBookmark /> <span className="pl-2">Bookmark</span>
                  </>
                )}
              </div>

              {/* <div
                className={`${
                  favorites.includes(summonerData.name)
                    ? ' bg-red-500'
                    : ' bg-slate-800'
                } text-white text-sm cursor-pointer hover:opacity-90   rounded inline-flex justify-center items-center py-2 px-4`}
                onClick={() => handleToggleFavorite(summonerData.name)}
              >
                {favorites.includes(summonerData.name) ? (
                  <>
                    <FaBookmark /> <span className="pl-2">Bookmarked</span>{' '}
                  </>
                ) : (
                  <>
                    <>
                      <FaRegBookmark /> <span className="pl-2">Bookmark</span>
                    </>
                  </>
                )}
              </div> */}
            </div>
          </article>
          <div className="flex p-4 font-medium tracking-wide text-slate-700  dark:text-slate-300 ">
            <div className=" pr-2">
              {' '}
              <Link to="">Overview</Link>
            </div>
            <div className={` flex items-center gap-1`}>
              <Link to="ingame">Spectator</Link>
              <div className={`${live ? ' text-green-400' : 'text-gray-500'} `}>
                <AiOutlineWifi size={'1.4rem'} />
              </div>
            </div>
          </div>

          <Outlet
            context={{
              summonerLeagues: summonerLeagues,
              champions: champions,
              versionPatch: versionPatch,
              historyList: historyList,
              handleLoadMore: handleLoadMore,
              hasNextPage: hasNextPage,
              runesInfo: runesInfo,
              summoner: summoner,
              server: server,
              isLoading: isLoading,
              summonerId: summonerData.id,
              isLive: live,
              gameData: gameData,
            }}
          />
        </>
      )}
    </>
  )
}
