import { useDarkMode } from './hooks/useDarkMode'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { HomeSearch } from './components/HomeSearch'
import { fetchSummonersData } from './services'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { NoMatch } from './components/NoMatch'

export const App = () => {
  const [darkTheme, setDarkTheme] = useDarkMode()

  useEffect(() => {
    fetchSummonersData().then((data) => {
      console.log(data)
    })
  }, [])

  return (
    <HelmetProvider>
      <Helmet>
        <body className={darkTheme} />
      </Helmet>
      <Routes>
        <Route
          element={<Layout darkTheme={darkTheme} setDarkTheme={setDarkTheme} />}
        >
          <Route path="/" element={<HomeSearch />} />
          
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </HelmetProvider>
  )
}
