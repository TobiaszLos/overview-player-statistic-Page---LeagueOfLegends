import { FormEvent, useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { fetchBestPlayersOfServer, fetchSummonerDataById } from '../services'
import { Server, SummonerBasic, TopSoloQPlayerPlusIcon } from '../types'
import { quickSort } from '../utilities/helpers/quickSort'
import { Loading } from '../components/Loading'
import { TopPlayerCard } from '../components/TopPlayerCard'

type Options = {
  value: Server
  label: string
}[]

const options: Options = [
  { value: 'EUW1', label: 'EUW' },
  { value: 'EUN1', label: 'EUNE' },
  { value: 'BR1', label: 'BR' },
  { value: 'JP1', label: 'JP' },
  { value: 'KR', label: 'KR' },
  { value: 'LA1', label: 'LAS' },
  { value: 'LA2', label: 'LAN' },
  { value: 'NA1', label: 'NA' },
  { value: 'OC1', label: 'OCE' },
  { value: 'PH2', label: 'PH' },
  { value: 'RU', label: 'RU' },
  { value: 'SG2', label: 'SG' },
  { value: 'TH2', label: 'TH' },
  { value: 'TR1', label: 'TR' },
  { value: 'TW2', label: 'TW' },
  { value: 'VN2', label: ' VN' },
]

export const Home = ({ versionPatch }: { versionPatch: string }) => {
  const [loading, setLoading] = useState(true)
  const [playersList, setPlayersList] = useState<TopSoloQPlayerPlusIcon[]>([])
  const [server, setServer] = useState<Server>('EUW1')

  const navigate = useNavigate()

  useEffect(() => {
    fetchTopPlayersList(server)
  }, [])

  const handleSearchChange = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let formData = new FormData(event.currentTarget)

    let summonerName = formData.get('summonerName')
    let region = formData.get('region')

    if (typeof summonerName === 'string' && typeof region === 'string') {
      navigate(`/${region}/${summonerName}`)
    } else {
      console.error('Invalid summoner name or region')
    }
  }

  const fetchTopPlayersList = async (server: Server) => {
    setLoading(true)
    const fetchedPlayers = await fetchBestPlayersOfServer(server)
    const sortByRanking = quickSort(fetchedPlayers, 'leaguePoints').slice(0, 5)

    const mergedSummonerData = await Promise.all(
      sortByRanking.map(async (summoner) => {
        const fetchedData: SummonerBasic | null = await fetchSummonerDataById(
          server,
          summoner.summonerId
        )

        if (!fetchedData) return

        const { profileIconId } = fetchedData

        return { ...summoner, profileIconId }
      })
    )

    setPlayersList((await mergedSummonerData) as TopSoloQPlayerPlusIcon[])
    setServer(server)
    setLoading(false)
  }
  //  text-2xl
  return (
    <div className="flex flex-col items-center">
      <div className="pt-16 pb-12">
        <div className="text-center leading-3">
          <span className="text-slate-600 dark:text-slate-100 text-4xl sm:text-5xl  font-bold ">
            Search Summoner Stats
          </span>
          <br />
          <span className="text-slate-400 dark:text-slate-300 text-2xl ">
            - LEAGUE OF LEGENDS -
          </span>
        </div>
      </div>

      <div className="w-11/12">
        <form
          onSubmit={(e) => handleSearchChange(e)}
          className="mt-5 h-12 flex w-full justify-center "
        >
          {/* FIXME center */}
          <select
            name="region"
            className="border  border-slate-400 rounded-l-lg font-bold focus:outline-none text-sm text-slate-600 md:px-4"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            id="summonerName"
            name="summonerName"
            type="text"
            className="border border-slate-400  focus:outline-none w-full pl-3 text-sm text-slate-600 font-bold"
          />
          <button className="text-white bg-orange-600 w-16 rounded-r-lg hover:bg-orange-500">
            <BiSearch size={'24px'} className="mx-auto" />
          </button>
        </form>
      </div>

      <div className="w-full px-4 ">
        <h2 className="mt-36 mb-0 text-center text-slate-700 dark:text-slate-300 text-2xl sm:text-3xl my-auto">
          The best summoners of the region
        </h2>

        <select
          name="region"
          onChange={(e) => {
            fetchTopPlayersList(e.currentTarget.value as Server)
          }}
          className=" p-2 mx-auto border-2 m-10  dark:border-slate-400 border-slate-600 rounded-lg bg-transparent py-2 font-bold focus:outline-none text-sm dark:text-slate-400 md:px-4"
        >
          {options.map((option) => (
            <option className='' key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {!loading ? (
          <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 w-full">
            {playersList.map((player, index) => (
              <TopPlayerCard
                key={player.summonerId}
                player={player}
                versionPath={versionPatch}
                server={server}
                rank={index}
              />
            ))}
          </ul>
        ) : (
          <div>
            <Loading />
          </div>
        )}
      </div>
    </div>
  )
}
