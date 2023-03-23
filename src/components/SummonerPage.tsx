import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  fetchSummonerDataByName,
  fetchSummonerLeagueDetails,
} from '../services'
import {
  RegionName,
  SummonerBasic,
  SummonerLeague,
  SummonerRankedLeagues,
} from '../types'

import { IconByTier } from '../utilities/IconsComponent'

export const SummonerPage = () => {
  const [summonerData, setSummonerData] = useState<
    SummonerBasic | null | undefined
  >(undefined)

  const [summonerLeagues, setSummonerLeagues] = useState<SummonerRankedLeagues>(
    {}
  )

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
    await fetchSummonerLeagueDetails(summonerId, region).then((data) => {
      const transformData = () => {
        return data.reduce((acc, currentVal: SummonerLeague) => {
          return {
            ...acc,
            [currentVal.queueType]: currentVal,
          }
        }, {})
      }
      console.log('transformData: ', transformData())

      setSummonerLeagues(transformData() as SummonerRankedLeagues)
    })
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
          <article className="p-4  grid-cols-3 gap-4 md:grid">
            <section className="">
              <div className="mb-4 border-2">
                <div>Ranked Solo</div>
                <div>
                  {summonerLeagues.RANKED_SOLO_5x5 === undefined ? (
                    'unranked'
                  ) : (
                    <div>
                      <div>
                        POINTS: {summonerLeagues.RANKED_SOLO_5x5.leaguePoints}
                      </div>
                      <div>RANK: {summonerLeagues.RANKED_SOLO_5x5.rank} </div>

                      <div> TIER: {summonerLeagues.RANKED_SOLO_5x5.tier} </div>
                      <IconByTier tier={summonerLeagues.RANKED_SOLO_5x5.tier} />
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4 border-2">
                <div>Ranked flex</div>
                <div>
                  {summonerLeagues.RANKED_FLEX_SR === undefined ? (
                    'unranked'
                  ) : (
                    <>
                      <div>RANKED </div>
                      <IconByTier tier={summonerLeagues.RANKED_FLEX_SR.tier} />
                    </>
                  )}
                </div>
              </div>
            </section>

            <section className="col-span-2  ">last games.....</section>
          </article>
        </>
      )}
    </>
  )
}
