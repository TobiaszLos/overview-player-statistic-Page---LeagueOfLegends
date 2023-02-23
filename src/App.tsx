import { useDarkMode } from './hooks/useDarkMode'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'

export const App = () => {
  const [darkTheme, setDarkTheme] = useDarkMode()

  return (
    <HelmetProvider>
      <Helmet>
        <body className={darkTheme} />
      </Helmet>
      <section className='dark:bg-slate-800 text-white h-screen'>
        <nav>
          <div className='flex justify-end p-4'>
            <input
              type="checkbox"
              id="dark-mode"
              className="peer invisible"
              checked={darkTheme !== 'dark'}
              onChange={setDarkTheme}
            />
            <label
              htmlFor="dark-mode"
              className="flex bg-slate-600 w-12 h-5 rounded-3xl p-1 relative [&>div]:peer-checked:translate-x-7 justify-between items-center cursor-pointer"
            >
              <BsFillSunFill className="text-amber-400 scale-75" />
              <BsFillMoonFill className="text-blue-400 scale-75" />
              <div className=" w-5 h-5 bg-white flex rounded-full absolute top-0 left-0 mt-0 transition-transform duration-200 ease-linear scale-75"></div>
            </label>
          </div>
        </nav>
        <section></section>
      </section>
    </HelmetProvider>
  )
}
