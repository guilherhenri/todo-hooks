import '@testing-library/jest-dom'

const testPath = expect.getState().testPath || ''

if (!testPath.includes('task-context.test.tsx')) {
  jest.mock('@/contexts/task-context', () => {
    const mockModule = jest.requireActual('@/tests/mocks/task-context')

    return mockModule
  })
}

if (!testPath.includes('local-storage.test.tsx')) {
  jest.mock('@/hooks/local-storage', () => ({
    useLocalStorage: () => ({
      syncStorage: jest.fn(),
      loadStorage: jest.fn(() => []),
    }),
  }))
}

jest.mock('uuid', () => ({
  v7: jest.fn(() => 'mocked-uuid-id'),
}))

beforeEach(() => {
  jest.clearAllMocks()
})
