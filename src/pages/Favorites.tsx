import { useEffect, useState } from 'react'
import useLocalStorageFavorites from '../hooks/useLocalStorageFavorites'

export const Favorites = () => {
  const [profileNames, setProfileNames] = useState<string[]>([])
 
  const {favorites, saveFavoriteToLocalStorage } = useLocalStorageFavorites('Profiles')




  return (
    <div> 
      {favorites &&
        favorites.map((name, index) => <div key={name + index}>{name}</div>)} 
    </div>
  )
}
