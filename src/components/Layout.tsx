import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { Link, Outlet } from 'react-router-dom'

interface LayoutProps {
  darkTheme: 'dark' | 'default' | 'white'
  setDarkTheme: () => void
}

export const Layout = ({ darkTheme, setDarkTheme }: LayoutProps) => {
  return (
    <main className="bg-slate-200 dark:bg-slate-900 dark:text-white ">
      <nav className="flex justify-between items-center px-8 bg-slate-800 2xl:px-24">
        <Link to="/">
          <div className="text-lg font-bold">
            <span className="text-red-600">LOL</span>
            <span className=" text-slate-100">SEARCH</span>
          </div>
        </Link>

        <div className="flex justify-end p-4">
          <input
            type="checkbox"
            id="dark-mode"
            className="peer invisible"
            checked={darkTheme !== 'dark'}
            onChange={setDarkTheme}
          />
          <label
            htmlFor="dark-mode"
            className="flex bg-slate-800 w-20 h-8 rounded-3xl p-1 relative [&>div]:peer-checked:translate-x-11 justify-around items-center cursor-pointer"
          >
            <BsFillSunFill className="text-amber-400 scale-95" />
            <BsFillMoonFill className="text-blue-400 scale-95" />
            <div className=" w-9 h-8 bg-white flex rounded-full absolute top-0 left-0 mt-0 transition-transform duration-200 ease-linear scale-75"></div>
          </label>
        </div>
      </nav>
      <div className=" bg-slate-600  dark:bg-slate-700 text-white">
        <ul className="flex  space-x-8 p-3 justify-start px-24">
          <li className=" cursor-pointer hover:opacity-90 font-normal text-sm">
            <Link to="/">Home</Link>
          </li>
          <li className=" cursor-pointer hover:opacity-90 font-normal text-sm">
            <Link to="/leaderboards">Leaderboards</Link>
          </li>

          <li className=" cursor-pointer hover:opacity-90 font-normal text-sm">
            <Link to="/bookmarks">Bookmarks</Link>
          </li> 
          <li className=" cursor-pointer hover:opacity-90 font-normal text-sm">
            <Link to="/bookmarks">Live games</Link>
          </li>
        </ul>
      </div>
      {/* ------------ CHILDREN ------------*/}

      <section className=" max-w-6xl m-auto min-h-screen ">
        <Outlet />
      </section>

      {/* ------------------------*/}

      <footer className="bg-slate-300 bg-opacity-30 mt-24 dark:bg-sky-900 dark:bg-opacity-10">
        <div className="text-base leading-6 text-gray-600  mr-4 pl-4 py-4 ">
          <span className="font-bold">LOLSEARCH</span> © 2023 |{' '}
          <span className="hover:text-slate-400 dark:hover:text-slate-200">
            <a href="https://github.com/tobiaszlos">GitHub</a>
          </span>{' '}
          |{' '}
          <span className="hover:text-slate-400 dark:hover:text-slate-200">
            <a href="https://github.com/TobiaszLos/League-of-Legends---player-searcher">
              Project
            </a>
          </span>
        </div>
      </footer>
    </main>
  )
}
