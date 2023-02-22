import { useEffect, useState } from 'react'

export const useLocalStorage = (key: string) => {
  const [storedValue, setStoredValue] = useState<string>(() => {
    const item = window.localStorage.getItem(key)

    return item ? JSON.parse(item) : 'default'
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue))
  }, [key, storedValue])

  const setValue = (value: ('dark' | 'white') | Function) => {
    const valueToStorage: string =
      value instanceof Function ? value(storedValue) : value

    setStoredValue(valueToStorage)
    window.localStorage.setItem(key, JSON.stringify(storedValue))
  }

  return [storedValue, setValue] as [string, typeof setValue]
}
