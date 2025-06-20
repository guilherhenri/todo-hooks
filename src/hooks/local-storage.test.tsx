import { act, renderHook } from '@testing-library/react'

import { useLocalStorage } from './local-storage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()

    jest.spyOn(Storage.prototype, 'setItem')
    jest.spyOn(Storage.prototype, 'getItem')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('syncStorage', () => {
    it('should store data in localStorage with correct key and stringified value', () => {
      const { result } = renderHook(() => useLocalStorage<string[]>())

      const testData = ['item1', 'item2']
      act(() => {
        result.current.syncStorage('test-key', testData)
      })

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'test-key',
        JSON.stringify(testData),
      )
    })

    it('should handle different data types correctly', () => {
      const { result } = renderHook(() =>
        useLocalStorage<{ id: number; name: string }>(),
      )

      const testData = { id: 1, name: 'test' }
      act(() => {
        result.current.syncStorage('object-key', testData)
      })

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'object-key',
        JSON.stringify(testData),
      )
    })
  })

  describe('loadStorage', () => {
    it('should return parsed data from localStorage when data exists', () => {
      const testData = ['item1', 'item2']
      localStorage.setItem('test-key', JSON.stringify(testData))

      const { result } = renderHook(() => useLocalStorage<string[]>())

      let loadedData
      act(() => {
        loadedData = result.current.loadStorage('test-key')
      })

      expect(localStorage.getItem).toHaveBeenCalledWith('test-key')
      expect(loadedData).toEqual(testData)
    })

    it('should return empty array as default when no data exists in localStorage', () => {
      const { result } = renderHook(() => useLocalStorage<string[]>())

      let loadedData
      act(() => {
        loadedData = result.current.loadStorage('non-existent-key')
      })

      expect(localStorage.getItem).toHaveBeenCalledWith('non-existent-key')
      expect(loadedData).toEqual([])
    })

    it('should be memoized and not change on re-renders', () => {
      const { result, rerender } = renderHook(() => useLocalStorage<string[]>())

      const firstLoadStorage = result.current.loadStorage

      rerender()

      expect(result.current.loadStorage).toBe(firstLoadStorage)
    })

    it('should handle complex object types correctly', () => {
      const testData = { id: 1, name: 'test' }
      localStorage.setItem('object-key', JSON.stringify(testData))

      const { result } = renderHook(() =>
        useLocalStorage<{ id: number; name: string }>(),
      )

      let loadedData
      act(() => {
        loadedData = result.current.loadStorage('object-key')
      })

      expect(loadedData).toEqual(testData)
    })

    it('should handle invalid JSON gracefully', () => {
      localStorage.setItem('invalid-key', 'not-a-valid-json')

      const { result } = renderHook(() => useLocalStorage<string[]>())

      let loadedData
      act(() => {
        loadedData = result.current.loadStorage('invalid-key')
      })

      expect(loadedData).toEqual([])
    })
  })
})
