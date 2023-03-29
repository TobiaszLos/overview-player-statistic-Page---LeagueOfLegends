import { useDarkMode } from './hooks/useDarkMode'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Home } from './components/Home'

import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { NoMatch } from './components/NoMatch'
import { SummonerPage } from './components/SummonerPage'


export const App = () => {
  const [darkTheme, setDarkTheme] = useDarkMode()



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
          <Route path="/" element={<Home />} />
          <Route path="/:server/:summoner" element={<SummonerPage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </HelmetProvider>
  )
}
