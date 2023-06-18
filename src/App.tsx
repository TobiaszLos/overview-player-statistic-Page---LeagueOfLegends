import { useDarkMode } from './hooks/useDarkMode'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Home } from './pages/Home'

import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { NoMatch } from './components/NoMatch'
import { SummonerPage } from './pages/SummonerPage'
import { useState, useEffect } from 'react'
import { getLatestPathVersion } from './services'
import { Favorites } from './pages/Favorites'
import { Leaderboards } from './pages/Leaderboards'

export const App = () => {
  const [darkTheme, setDarkTheme] = useDarkMode()
  const [versionPatch, setVersionPatch] = useState('')

  useEffect(() => {
    const getVersion = async () => {
      const version = await getLatestPathVersion()
      setVersionPatch(version)
    }
    getVersion()
  }, [])

  return (
    <HelmetProvider>
      <Helmet>
        <title>
          LOLSEARCH, search profiles, look into the performance of the best
          players
        </title>
        <body className={darkTheme} />
      </Helmet>
      <Routes>
        <Route
          element={<Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} />}
        >
          <Route path="/" element={<Home versionPatch={versionPatch} />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/Leaderboards" element={<Leaderboards />} />
          <Route
            path="/:server/:summoner"
            element={<SummonerPage versionPatch={versionPatch} />}
          />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </HelmetProvider>
  )
}
