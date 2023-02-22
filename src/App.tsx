import { useDarkMode } from './hooks/useDarkMode'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export const App = () => {
  const [darkTheme, setDarkTheme] = useDarkMode()

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <body className={darkTheme} />
        </Helmet>

        <button
          onClick={setDarkTheme}
          className="rounded-2xl border px-6 py-1 dark:text-white dark:bg-slate-800"
        >
          Theme {darkTheme}
        </button>
      </div>
    </HelmetProvider>
  )
}


