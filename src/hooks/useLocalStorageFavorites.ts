import { useState } from 'react'

const useLocalStorageFavorites = (key: string) => {
  const [favorites, setFavorites] = useState<
    { name: string; server: string }[]
  >(() => {
    const profilesFromLocalStorage = window.localStorage.getItem(key)
    return profilesFromLocalStorage ? JSON.parse(profilesFromLocalStorage) : []
  })

  const saveFavoriteToLocalStorage = (newName: string, server: string) => {
    setFavorites((prevFavorites) => {
      const listOfFavoritesProfiles = [
        ...prevFavorites,
        { name: newName, server: server },
      ]
      window.localStorage.setItem(key, JSON.stringify(listOfFavoritesProfiles))
      return listOfFavoritesProfiles
    })
  }

  const removeFavoriteFromLocalStorage = (name: string) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (favorite) => favorite.name !== name
      )
      window.localStorage.setItem(key, JSON.stringify(updatedFavorites))
      return updatedFavorites
    })
  }

  return {
    favorites,
    saveFavoriteToLocalStorage,
    removeFavoriteFromLocalStorage,
  }
}

export default useLocalStorageFavorites