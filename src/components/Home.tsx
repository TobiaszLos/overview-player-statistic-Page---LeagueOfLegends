import { FormEvent } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { RegionName } from '../types'

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

export const HomeSearch = () => {
  const navigate = useNavigate()

  const handleChange = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let formData = new FormData(event.currentTarget)

    let summonerName = formData.get('summonerName')
    let region = formData.get('region')

    if (typeof summonerName === 'string' && typeof region === 'string') {
      // onSearch(summonerName, region as RegionName)
      navigate(`/${region}/${summonerName}`)
    } else {
      console.error('Invalid summoner name or region')
    }
  }

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
          className="mt-5 h-12 flex w-full justify-center"
        >
          <select
            name="region"
            className="border rounded-l-lg font-bold focus:outline-none text-sm text-slate-600 md:px-4"
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
            className="border focus:outline-none w-full pl-3 text-sm text-slate-600 font-bold"
          />
          <button className="text-white bg-orange-600 w-16 rounded-r-lg hover:bg-orange-500">
            <BiSearch size={'24px'} className="mx-auto" />
          </button>
        </form>
      </div>

      <div className='mt-20'>
        <h2 className='font-bold text-slate-800 dark:text-slate-100'>Top 5 accounts</h2>
      </div>
    </div>
  )
}
