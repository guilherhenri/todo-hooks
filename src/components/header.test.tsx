import { render, screen } from '@testing-library/react'

import {
  resetTaskContextMocks,
  setMockTaskContextState,
} from '@/tests/mocks/task-context'

import * as FiltersModule from './filters'
import { Header } from './header'

jest.mock('./filters', () => ({
  Filters: jest.fn(() => <div>Mocked Filters</div>),
}))

describe('Header Component', () => {
  beforeEach(() => {
    resetTaskContextMocks()
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render header with task statistics', () => {
      setMockTaskContextState({ meta: { total: 5, done: 2 } })
      render(<Header />)

      expect(screen.getByText(/tarefas criadas/i)).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.getByText(/concluídas/i)).toBeInTheDocument()
      expect(screen.getByText('2 de 5')).toBeInTheDocument()
      expect(screen.getByText(/mocked filters/i)).toBeInTheDocument()
    })

    it('should render Filters component', () => {
      render(<Header />)

      expect(FiltersModule.Filters).toHaveBeenCalled()
    })

    it('should render correct task statistics when no tasks exist', () => {
      setMockTaskContextState({ meta: { total: 0, done: 0 } })
      render(<Header />)

      expect(screen.getByText('0')).toBeInTheDocument()
      expect(screen.getByText('0 de 0')).toBeInTheDocument()
    })

    it('should render correct task statistics when all tasks are completed', () => {
      setMockTaskContextState({ meta: { total: 3, done: 3 } })
      render(<Header />)

      expect(screen.getByText('3')).toBeInTheDocument()
      expect(screen.getByText('3 de 3')).toBeInTheDocument()
    })

    it('should render correct task statistics when no tasks are completed', () => {
      setMockTaskContextState({ meta: { total: 4, done: 0 } })
      render(<Header />)

      expect(screen.getByText('4')).toBeInTheDocument()
      expect(screen.getByText('0 de 4')).toBeInTheDocument()
    })
  })

  describe('Context Integration', () => {
    it('should update displayed statistics when context meta changes', () => {
      setMockTaskContextState({ meta: { total: 10, done: 7 } })
      render(<Header />)

      expect(screen.getByText('10')).toBeInTheDocument()
      expect(screen.getByText('7 de 10')).toBeInTheDocument()
    })
  })
})
