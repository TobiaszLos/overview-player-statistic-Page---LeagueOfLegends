import { useEffect, useState } from 'react'
import useLocalStorageFavorites from '../hooks/useLocalStorageFavorites'
import { Link } from 'react-router-dom'
import { MdOutlineBookmarks } from 'react-icons/md'

import { TbBookmarksOff } from 'react-icons/tb'

export const Bookmarks = ({ versionPatch }: { versionPatch: string }) => {
  const {
    favorites,
    saveFavoriteToLocalStorage,
    removeFavoriteFromLocalStorage,
  } = useLocalStorageFavorites('Profiles')

  return (
    <div>
      <h5 className=' text-lg font-semibold text-center my-8'>Bookmarks List</h5>
      <div className="p-4 flex flex-wrap justify-center gap-2 mt-6">
        {favorites.length !== 0 ? (
          favorites.map((summoner, index) => (
            <div
              key={`${summoner} ${index}`}
              className="max-w-sm bg-white dark:bg-slate-700 overflow-hidden rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              <Link
                to={`/${summoner.server}/${summoner.name}/`}
                className="block p-3 bg-gray-200 dark:bg-gray-800  text-cyan-700 dark:text-cyan-500 font-medium"
                target="_blank"
              >
            
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/${versionPatch}/img/profileicon/${summoner.icon}.png`}
                  alt=""
                  className=" w-24 rounded-lg ml-2"
                />
              </Link>
              <div className=" absolute top-0">
                <TbBookmarksOff
                  className="text-slate-500 hover:text-red-500 cursor-pointer"
                  size={16}
                  onClick={() =>
                    confirm(`Confirm deletion of '${summoner.name}' profile? `)
                      ? removeFavoriteFromLocalStorage(summoner.name)
                      : console.log('false')
                  }
                />
              </div>
              <Link
                to={`/${summoner.server}/${summoner.name}/`}
                target="_blank"
              >
                <div className="flex justify-center items-center p-2">
                  <div className="pt-1  text-sm font-bold ">
                    {summoner.name}
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 dark:text-slate-300">
            <MdOutlineBookmarks size={48} />
            <h5 className="font-bold text-center">No saved bookmarks</h5>
            <p className="text-sm text-center">
              Bookmarks you save will be stored here
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
