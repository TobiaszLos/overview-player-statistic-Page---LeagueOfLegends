import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { Link, Outlet } from 'react-router-dom'

interface LayoutProps {
  darkTheme: 'dark' | 'default' | 'white'
  setDarkTheme: () => void
}

export const Layout = ({ darkTheme, setDarkTheme }: LayoutProps) => {
  return (
    <main className="bg-slate-50 dark:bg-slate-800 dark:text-white ">
      <nav className="flex justify-between items-center px-8 bg-slate-900 2xl:px-24">
        <Link to="/">
          <div className="text-lg font-bold">
            <span className="text-orange-600">LOL</span>
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
      <section className="max-w-3xl m-auto min-h-screen ">
        <Outlet />
      </section>
    </main>
  )
}
