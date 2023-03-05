import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchSummonerDataByName } from '../services'
import { RegionName, SummonerBasic } from '../types'

export const SummonerPage = () => {
  const [summonerData, setSummonerData] = useState<SummonerBasic>()
  const { summoner, region } = useParams()

  useEffect(() => {
    if (summoner && region) {
      searchSummonerByName(summoner, region as RegionName)
    }
  }, [])

  const searchSummonerByName = (name: string, region: RegionName) => {
    fetchSummonerDataByName(name, region).then((data) => setSummonerData(data))
  }
  console.log(summonerData, 'POZA')
  return (
    <div>
      <h1>
        Summoner Page{' '}
        {!summonerData ? (
          'Loading'
        ) : (
          <div>
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/13.4.1/img/profileicon/${summonerData.profileIconId}.png`}
              alt="No image"
            />
            <h2 className='text-2xl'>{summonerData.name}</h2>
            <p className='font-bold'>{summonerData.summonerLevel}</p>
          </div>
        )}
      </h1>
    </div>
  )
}
