import { useLocalStorage } from './useLocalStorage'

export const useDarkMode = () => {
  const [storedValue, setStoredValue] = useLocalStorage('theme')

  const setDarkTheme = () => {
    storedValue === 'dark' ? setStoredValue('white') : setStoredValue('dark')
  }

  return [storedValue, setDarkTheme] as [('default' | 'dark' | 'white'), typeof setDarkTheme]
}
