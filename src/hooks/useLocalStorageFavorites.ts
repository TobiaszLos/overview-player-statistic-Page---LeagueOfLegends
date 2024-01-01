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

  return {
    favorites,
    saveFavoriteToLocalStorage,
  };
};

export default useLocalStorageFavorites;
