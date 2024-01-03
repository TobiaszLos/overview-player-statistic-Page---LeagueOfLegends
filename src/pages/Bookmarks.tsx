import { useEffect, useState } from 'react'
import useLocalStorageFavorites from '../hooks/useLocalStorageFavorites'
import { Link } from 'react-router-dom'

import { IoBrowsersOutline } from 'react-icons/io5'

export const Bookmarks = () => {
  const [profileNames, setProfileNames] = useState<string[]>([])

  const { favorites, saveFavoriteToLocalStorage } =
    useLocalStorageFavorites('Profiles')

  return (
    <article className="p-8 flex flex-wrap gap-8 pt-8">
      {favorites.length !== 0 ? (
        favorites.map((itemObj, index) => (
          <div
            key={`${itemObj} ${index}`}
            className="flex-shrink-0 border  border-slate-400 text-sm font-bold rounded-2xl px-4 py-2 flex items-center space-x-4 cursor-pointer hover:bg-slate-300  dark:hover:bg-slate-800"
          >
            <Link to={`/${itemObj.server}/${itemObj.name}/`} target="_blank">
              <div className="">{itemObj.name}</div>
            </Link>
            <svg
              className=" text-slate-400 hover:text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
           
              viewBox="0 0 16 16"
            >
              <path d="M2 14.879L14.879 2 16 3.121 3.121 16 2 14.879zM3.121 2L16 14.879 14.879 16 2 3.121 3.121 2z" />
            </svg>
          </div>
        ))
      ) : (
        <div>not found</div>
      )}
    </article>
  )
}
