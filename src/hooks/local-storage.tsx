import { useCallback } from 'react'

interface UseLocalStorageResponse<T> {
  syncStorage: (name: string, data: T) => void
  loadStorage: (name: string) => T
}

export const useLocalStorage = <T,>(): UseLocalStorageResponse<T> => {
  function syncStorage(name: string, data: T) {
    const dataStringify = JSON.stringify(data)

    localStorage.setItem(name, dataStringify)
  }

  const loadStorage = useCallback((name: string): T => {
    const localData = localStorage.getItem(name)

    return localData ? (JSON.parse(localData) as T) : ([] as T)
  }, [])

  return { syncStorage, loadStorage }
}
