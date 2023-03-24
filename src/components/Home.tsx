import { FormEvent, useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import {
  fetchBestPlayersOfServer,
  fetchSummonerDataByName,
  getLatestPathVersion,
} from '../services'
import { RegionName, TopSoloQPlayers } from '../types'
import { quickSort } from '../utilities/quickSort'
import { TopPlayerSection } from './TopPlayersSection'

type Options = {
  value: RegionName
  label: string
}[]

const options: Options = [
  { value: 'EUW1', label: 'EUW' },
  { value: 'BR1', label: 'BR' },
  { value: 'EUN1', label: 'EUNE' },
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

export const Home = () => {
  const [playersList, setPlayersList] = useState<TopSoloQPlayers[]>([])
  const [versionPath, setVersionPath] = useState('')
  const [playerDetails, setPlayerDetails] = useState()
  const [region, setRegion] = useState<RegionName>('EUW1')

  const navigate = useNavigate()

  useEffect(() => {
    const getVersion = async () => {
      const version = await getLatestPathVersion()
      setVersionPath(version)
    }
    getVersion()
  }, [])

  const handleChange = (event: FormEvent<HTMLFormElement>) => {
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

  const fetchTopPlayersList = async (region: RegionName) => {
    const fetchedPlayers = await fetchBestPlayersOfServer(region)
    const sortByRanking = quickSort(fetchedPlayers, 'leaguePoints')

    setPlayersList(sortByRanking.slice(0, 8))
  }

  useEffect(() => {
    fetchTopPlayersList(region)
  }, [region])

  return (
    <div className="flex flex-col items-center">
      <div className="pt-16 pb-12">
        <div className="text-center leading-3">
          <span className="text-slate-600 dark:text-slate-100 text-4xl font-bold ">
            Search Summoner Stats
          </span>
          <br />
          <span className="text-slate-400 dark:text-slate-300 text-lg">
            - LEAGUE OF LEGENDS -
          </span>
        </div>
      </div>

      <div className="w-11/12">
        <form
          onSubmit={(e) => handleChange(e)}
          className="mt-5 h-12 flex w-full justify-center "
        >
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

      <div>
        <h2 className=" mt-28 mb-8 text-center text-slate-700 dark:text-slate-300 font-semibold text-2xl my-auto">
          The best summoners of the region
        </h2>
        <select
          name="region"
          onChange={(e) => {
            setRegion(e.currentTarget.value as RegionName)
          }}
          className="border-2 dark:border-red-50 border-slate-400 rounded-2xl bg-transparent py-2 font-bold focus:outline-none text-sm dark:text-slate-400 md:px-4"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-16 mt-8">
          {!!playersList.length &&
            playersList.map((player, index) => (
              <TopPlayerSection
                key={player.summonerId}
                rank={index}
                player={player}
                versionPath={versionPath}
                region={region}
              />
            ))}
        </ul>
      </div>
    </div>
  )
}
