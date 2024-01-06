import React, { useEffect, useState } from 'react'
import { fetchBestPlayersOfServer } from '../services'
import { Server, TopSoloQPlayer } from '../types'
import { quickSort } from '../utilities/helpers/quickSort'
import { Link } from 'react-router-dom'
import { SelectRegion } from '../utilities/SelectRegion'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

export const Leaderboards = () => {
  const itemsPerPage = 10
  const [loading, setLoading] = useState(true)
  const [server, setServer] = useState<Server>('EUW1')
  const [playersList, setPlayersList] = useState<TopSoloQPlayer[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    // Fetch top players when the server or current page changes
    fetchTopPlayersList(server, currentPage)
  }, [server, currentPage])

  const fetchTopPlayersList = async (server: Server, page: number) => {
    setLoading(true)
    try {
      const fetchedPlayers = await fetchBestPlayersOfServer(server)
      const sortByRanking = quickSort(fetchedPlayers, 'leaguePoints')
      const startIndex = (page - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      const paginatedList = sortByRanking.slice(startIndex, endIndex)

      setServer(server)
      setPlayersList(paginatedList)
    } catch (error) {
      console.error('Error fetching top players:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateRank = (index: number) => {
    return (currentPage - 1) * itemsPerPage + index + 1
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  return (
    <section className="max-w-6xl m-auto min-h-screen p-4 text-xs">
      <h1 className="text-2xl font-bold text-slate-800 my-6">Leaderboards</h1>
      <div>
        <SelectRegion
          onChangeEvent={(e) =>
            fetchTopPlayersList(e.currentTarget.value as Server, currentPage)
          }
          style="p-2 mx-auto border-2 m-10 dark:border-slate-400 border-slate-600 rounded-lg bg-transparent py-2 font-bold focus:outline-none text-sm dark:text-slate-400 md:px-4"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-r">Rank</th>
              <th className="py-2 px-4 border-r">Player</th>
              <th className="py-2 px-4 border-r">LP</th>
              <th className="py-2 px-4 border-r">Wins</th>
              <th className="py-2 px-4">Losses</th>
            </tr>
          </thead>
          {playersList ? (
            <tbody>
              {playersList.map((item, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="py-2 px-4 border-r">{calculateRank(index)}</td>
                  <td className="py-2 px-4 border-r">
                    <div className="flex items-center">
                      <Link
                        to={`/EUW1/${item.summonerName}/`}
                        target="_blank"
                        className=" hover:text-blue-400"
                      >
                        <span className="font-bold">{item.summonerName}</span>
                      </Link>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-r">{item.leaguePoints}</td>
                  <td className="py-2 px-4 border-r">{item.wins}</td>
                  <td className="py-2 px-4">{item.losses}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <div>loading...</div>
          )}
        </table>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-red-500 dark:bg-red-800 text-white px-4 py-2 rounded cursor-pointer mb-2 sm:mb-0 hover:bg-blue-600 transition duration-300"
        >
          <FaArrowLeft />
        </button>
        <span className="text-lg font-bold mb-2 sm:mb-0">{`Page ${currentPage}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={playersList.length < itemsPerPage}
          className="bg-red-500 dark:bg-red-800 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition duration-300"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  )
}
