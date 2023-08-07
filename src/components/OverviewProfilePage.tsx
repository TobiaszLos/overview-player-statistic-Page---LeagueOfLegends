import { BiCaretDown } from 'react-icons/bi'
import { ChampionMasteryStats, MatchDTO, RuneReforged, Server, SummonerRankedLeagues } from '../types'
import { LeagueCard } from './LeagueCard'
import { Loading } from '../utilities/Loading'
import MasteryChampionCard from './MasteryChampionCard'
import { MatchCard } from './MatchCard'
import { useOutletContext } from 'react-router-dom'

interface OverviewProfilePageProps {
  summonerLeagues: SummonerRankedLeagues
  champions: ChampionMasteryStats[]
  versionPatch: string
  historyList:MatchDTO[]
  handleLoadMore: () => void
  hasNextPage: boolean
  runesInfo: RuneReforged[]
  summoner: string 
  server: Server
  isLoading: boolean

}

export const OverviewProfilePage = () => {

 const c = useOutletContext<OverviewProfilePageProps>()

  return (
    <article className="p-4 lg:grid lg:grid-cols-9 gap-2">
      <section className="col-span-3  sm:grid sm:grid-cols-4  lg:flex lg:flex-col  sm:bg-transparent lg:bg-transparent">
        <LeagueCard
          customCss="sm:col-span-2 lg:col-span-1 sm:mr-1 lg:mr-0"
          nameLeague="Ranked Solo"
          value={
            c.summonerLeagues.RANKED_SOLO_5x5 !== undefined
              ? c.summonerLeagues.RANKED_SOLO_5x5
              : null
          }
        />
        <LeagueCard
          customCss="sm:col-span-2 lg:col-span-1"
          nameLeague="Ranked Flex"
          value={
            c.summonerLeagues.RANKED_FLEX_SR !== undefined
              ? c.summonerLeagues.RANKED_FLEX_SR
              : null
          }
        />
        <MasteryChampionCard
          customCss="sm:col-span-4 lg:col-span-1"
          champions={c.champions!}
          versionPatch={c.versionPatch}
        />
      </section>

      <section className="col-span-6">
        <div className="mb-2 p-2  flex items-center border-l-4 border-r-4 border-slate-700 dark:border-sky-800 dark:border-opacity-60  bg-white bg-opacity-75  rounded-md dark:bg-sky-900 dark:bg-opacity-20 text-slate-700  text-base dark:text-slate-200  ">
          <div className="pl-2 text-sm tracking-wider font-medium">Matches</div>
        </div>

        {c.historyList.length > 0 ? (
          <>
            {c.historyList.map((match) => (
              <MatchCard
                runesInfo={c.runesInfo!}
                key={match.metadata.matchId}
                match={match}
                summonerName={c.summoner!}
                versionPatch={c.versionPatch}
                server={c.server as Server}
              />
            ))}
            {c.hasNextPage && (
              <button
                className="w-full border font-medium py-2 text-sm rounded-md text-slate-600 hover:border-opacity-70 border-slate-400  dark:bg-transparent dark:border-sky-600 dark:hover:border-sky-700 dark:border-opacity-50 dark:text-gray-300   hover:border-slate-600"
                onClick={c.handleLoadMore}
              >
                {c.isLoading ? (
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
  

    )
}


