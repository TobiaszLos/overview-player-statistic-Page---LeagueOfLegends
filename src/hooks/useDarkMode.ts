import { useLocalStorage } from './useLocalStorage'

export const useDarkMode = () => {
  const [storedValue, setStoredValue] = useLocalStorage('theme')

  const isDark = storedValue === 'dark' ? 'dark' : 'white'

  const setDarkTheme = () => {
    isDark === 'dark' ? setStoredValue('white') : setStoredValue('dark')
  }

  return [storedValue, setDarkTheme] as [string, typeof setDarkTheme]
}
