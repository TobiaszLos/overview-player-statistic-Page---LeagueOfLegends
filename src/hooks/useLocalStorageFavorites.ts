import { useState } from 'react';

const useLocalStorageFavorites = (key: string) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const profilesFromLocalStorage = window.localStorage.getItem(key);
    return profilesFromLocalStorage ? JSON.parse(profilesFromLocalStorage) : [];
  });

  const saveFavoriteToLocalStorage = (newName: string) => {
    setFavorites((prevFavorites) => {
      const listOfFavoritesProfiles = [...prevFavorites, newName];
      window.localStorage.setItem(key, JSON.stringify(listOfFavoritesProfiles));
      return listOfFavoritesProfiles;
    });
  };

  const removeFavoriteFromLocalStorage = (name: string) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((favorite) => favorite !== name);
      window.localStorage.setItem(key, JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return {
    favorites,
    saveFavoriteToLocalStorage,
    removeFavoriteFromLocalStorage,
  };
};

export default useLocalStorageFavorites;
