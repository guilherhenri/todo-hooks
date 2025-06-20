import '@testing-library/jest-dom'

jest.mock('@/contexts/task-context', () => {
  const mockModule = jest.requireActual('@/tests/mocks/task-context')

  return mockModule
})

jest.mock('@/hooks/local-storage', () => ({
  useLocalStorage: () => ({
    syncStorage: jest.fn(),
    loadStorage: jest.fn(() => []),
  }),
}))

jest.mock('uuid', () => ({
  v7: jest.fn(() => 'mocked-uuid-id'),
}))

beforeEach(() => {
  jest.clearAllMocks()
})
