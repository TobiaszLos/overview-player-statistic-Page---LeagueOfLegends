import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  fetchSummonerDataByName,
  fetchSummonerLeagueDetails,
} from '../services'
import { RegionName, SummonerBasic, SummonerLeague } from '../types'

export const SummonerPage = () => {
  const [summonerData, setSummonerData] = useState<
    SummonerBasic | null | undefined
  >(undefined)

  const [summonerLeagues, setSummonerLeagues] = useState<SummonerLeague[]>([])

  const { summoner, region } = useParams()

  useEffect(() => {
    if (summoner && region) {
      searchSummonerByName(summoner, region as RegionName)
    }
  }, [])

  const searchSummonerByName = (name: string, region: RegionName) => {
    fetchSummonerDataByName(region, name).then((data) => {
      setSummonerData(data)
      if (data?.id) {
        fetchSummonerLeagueData(data.id, region)
      }
    })
  }

  const fetchSummonerLeagueData = async (
    summonerId: string,
    region: RegionName
  ) => {
    await fetchSummonerLeagueDetails(summonerId, region).then((data) =>
      setSummonerLeagues(data)
    )
  }

  console.log('summonerLeagues: ', summonerLeagues)

  return (
    <>
      {summonerData === undefined && <div>Loading...</div>}
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
          <article className="p-4 flex gap-8 ">
            <div className="w-36 relative ">
              <img
                className="w-full rounded-xl "
                src={`http://ddragon.leagueoflegends.com/cdn/13.4.1/img/profileicon/${summonerData.profileIconId}.png`}
                alt="No image"
              />
              <div className="font-bold absolute bottom-0 bg-black w-full grid place-content-center text-white bg-opacity-30 rounded-b-xl">
                <span className=" font-normal p-1">
                  level {summonerData.summonerLevel}
                </span>
              </div>
            </div>
            <div>
              <h2 className=" text-2xl font-semibold">{summonerData.name}</h2>
            </div>
          </article>
          <article className="p-4 gap-8 ">
            <section>
              <div>
                <div>Ranked Solo</div>
                <div>content</div>
              </div>

              <div>
                <div>Ranked flex</div>
                <div>content</div>
              </div>
            </section>
            <section>last games.....</section>
          </article>
        </>
      )}
    </>
  )
}
