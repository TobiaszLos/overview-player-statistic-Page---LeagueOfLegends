import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchSummonerDataByName } from '../services'
import { RegionName, SummonerBasic } from '../types'

export const SummonerPage = () => {
  const [summonerData, setSummonerData] = useState<
    SummonerBasic | null | undefined
  >(undefined)
  const { summoner, region } = useParams()

  useEffect(() => {
    if (summoner && region) {
      searchSummonerByName(summoner, region as RegionName)
    }
  }, [])

  const searchSummonerByName = (name: string, region: RegionName) => {
    fetchSummonerDataByName(region, name).then((data) => setSummonerData(data))
  }
  console.log(summonerData, 'summonerData _+_+_')
  return (
    <div>
      <div>
        {summonerData === undefined && <div>Loading...</div>}

        {summonerData === null && (<div className='mt-20 text-center '>
          <h5 className='text-2xl font-bold'>Its look like this player can't be find.Please check spelling.</h5>
          <p className='mt-10 text-sm text-gray-800 dark:text-white'>Did you select the right server? Try searching for the summoner in another region</p>
          </div>)}

        {summonerData && (
          <div>
            <h2>{summonerData.name}</h2>
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/13.4.1/img/profileicon/${summonerData.profileIconId}.png`}
              alt="No image"
            />
            <p className="font-bold">{summonerData.summonerLevel}</p>
          </div>
        )}
      </div>
    </div>
  )
}
