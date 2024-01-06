import { useState } from 'react'

import { SummonerBasic } from '../types'; 

const useLocalStorageFavorites = (key: string) => {
  const [favorites, setFavorites] = useState<
    { name: string; server: string, icon:number}[]
  >(() => {
    const profilesFromLocalStorage = window.localStorage.getItem(key)
    return profilesFromLocalStorage ? JSON.parse(profilesFromLocalStorage) : []
  })

  const saveFavoriteToLocalStorage = (newName: string, server: string, icon:number) => {
    setFavorites((prevFavorites) => {
      const listOfFavoritesProfiles = [
        ...prevFavorites,
        { name: newName, server: server, icon:icon},
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

 
