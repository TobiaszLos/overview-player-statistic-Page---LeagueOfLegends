import { BiSearch } from 'react-icons/bi'

const options = [
  { value: 'undefined', label: 'Server' },
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
  return (
    <section className="flex flex-col items-center">
      <div className="pt-16 pb-12">
        <div className="text-center">
          <span className="text-slate-600 dark:text-slate-100 text-4xl font-bold ">
            Find a summoner
          </span>
          <br />
          <span className="text-slate-400 dark:text-slate-300 text-lg">
            - LEAGUE OF LEGENDS -
          </span>
        </div>
      </div>

      <div className="w-11/12">
        <form className="mt-5 h-12 flex w-full justify-center">
          <select
            name="region"
            className="border  rounded-l-lg font-bold focus:outline-none text-sm text-slate-600 md:px-4"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            id="search"
            type="text"
            className="border focus:outline-none w-full  pl-3  text-sm text-slate-600 font-bold"
          />
          <button className=" text-white bg-orange-600 w-16 rounded-r-lg hover:bg-orange-500">
            <BiSearch size={'24px'} className="mx-auto" />
          </button>
        </form>
      </div>
    </section>
  )
}

// <BiSearch className="" />
