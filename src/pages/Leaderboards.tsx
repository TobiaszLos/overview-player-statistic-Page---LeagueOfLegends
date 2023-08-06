import { useEffect, useState } from 'react'
import { fetchBestPlayersOfServer, fetchSummonerDataById } from '../services'
import { Server, SummonerBasic, TopSoloQPlayerPlusIcon } from '../types'
import { quickSort } from '../utilities/helpers/quickSort'

export const Leaderboards = () => {
  const [loading, setLoading] = useState(true)
  const [server, setServer] = useState<Server>('EUW1')
  const [playersList, setPlayersList] = useState<TopSoloQPlayerPlusIcon[]>([])

  useEffect(() => {
    fetchTopPlayersList(server)
  }, [])

  const fetchTopPlayersList = async (server: Server) => {
    setLoading(true)
    const fetchedPlayers = await fetchBestPlayersOfServer(server)
    const sortByRanking = quickSort(fetchedPlayers, 'leaguePoints').slice(
      0,
      100
    )
    console.log(sortByRanking)
    // const mergedSummonerData = await Promise.all(
    //   sortByRanking.map(async (summoner) => {
    //     const fetchedData: SummonerBasic | null = await fetchSummonerDataById(
    //       server,
    //       summoner.summonerId
    //     )

    //     if (!fetchedData) return

    //     const { profileIconId } = fetchedData

    //     return { ...summoner, profileIconId }
    //   })
    // )

    //  setPlayersList((await mergedSummonerData) as TopSoloQPlayerPlusIcon[])
    setServer(server)
    setLoading(false)
  }

  console.log(playersList, 'aa')

  return <div> 'Leaderboards' </div>
}
