import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  mockTaskContext,
  resetTaskContextMocks,
  setMockTaskContextState,
} from '@/tests/mocks/task-context'

import { Filters } from './filters'

describe('Filters Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    resetTaskContextMocks()
  })

  describe('Rendering', () => {
    it('should render all filter checkboxes', () => {
      render(<Filters />)

      expect(screen.getByLabelText(/todas/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/alta/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/normal/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/baixa/i)).toBeInTheDocument()
    })

    it('should check "Todas" checkbox when filter is "all"', () => {
      setMockTaskContextState({ filter: 'all' })
      render(<Filters />)

      expect(screen.getByLabelText(/todas/i)).toBeChecked()
      expect(screen.getByLabelText(/alta/i)).toBeChecked()
      expect(screen.getByLabelText(/normal/i)).toBeChecked()
      expect(screen.getByLabelText(/baixa/i)).toBeChecked()
    })

    it('should check specific priority checkbox when filter includes it', () => {
      setMockTaskContextState({ filter: new Set(['high']) })
      render(<Filters />)

      expect(screen.getByLabelText(/todas/i)).not.toBeChecked()
      expect(screen.getByLabelText(/alta/i)).toBeChecked()
      expect(screen.getByLabelText(/normal/i)).not.toBeChecked()
      expect(screen.getByLabelText(/baixa/i)).not.toBeChecked()
    })

    it('should check multiple priority checkboxes when filter includes them', () => {
      setMockTaskContextState({ filter: new Set(['high', 'regular']) })
      render(<Filters />)

      expect(screen.getByLabelText(/todas/i)).not.toBeChecked()
      expect(screen.getByLabelText(/alta/i)).toBeChecked()
      expect(screen.getByLabelText(/normal/i)).toBeChecked()
      expect(screen.getByLabelText(/baixa/i)).not.toBeChecked()
    })
  })

  describe('Interactions', () => {
    it('should call updateFilter with "all" when "Todas" checkbox is checked', async () => {
      setMockTaskContextState({ filter: new Set() })
      render(<Filters />)

      const checkbox = screen.getByLabelText(/todas/i)

      await user.click(checkbox)

      expect(mockTaskContext.updateFilter).toHaveBeenCalledWith('all', 'add')
    })

    it('should call updateFilter with "all" when "Todas" checkbox is unchecked', async () => {
      setMockTaskContextState({ filter: 'all' })
      render(<Filters />)

      const checkbox = screen.getByLabelText(/todas/i)
      await user.click(checkbox)

      expect(mockTaskContext.updateFilter).toHaveBeenCalledWith('all', 'remove')
    })

    it('should call updateFilter with "Alta" when high priority checkbox is checked', async () => {
      setMockTaskContextState({ filter: new Set() })
      render(<Filters />)

      const checkbox = screen.getByLabelText(/alta/i)
      await user.click(checkbox)

      expect(mockTaskContext.updateFilter).toHaveBeenCalledWith('high', 'add')
    })

    it('should call updateFilter with "remove" when high priority checkbox is unchecked', async () => {
      setMockTaskContextState({ filter: new Set(['high']) })
      render(<Filters />)

      const checkbox = screen.getByLabelText(/alta/i)
      await user.click(checkbox)

      expect(mockTaskContext.updateFilter).toHaveBeenCalledWith(
        'high',
        'remove',
      )
    })

    it('should call updateFilter with "Normal" when regular priority checkbox is checked', async () => {
      setMockTaskContextState({ filter: new Set() })
      render(<Filters />)

      const checkbox = screen.getByLabelText(/normal/i)
      await user.click(checkbox)

      expect(mockTaskContext.updateFilter).toHaveBeenCalledWith(
        'regular',
        'add',
      )
    })

    it('should call updateFilter with "remove" when regular priority checkbox is unchecked', async () => {
      setMockTaskContextState({ filter: new Set(['regular']) })
      render(<Filters />)

      const checkbox = screen.getByLabelText(/normal/i)
      await user.click(checkbox)

      expect(mockTaskContext.updateFilter).toHaveBeenCalledWith(
        'regular',
        'remove',
      )
    })

    it('should call updateFilter with "Baixa" when low priority checkbox is checked', async () => {
      setMockTaskContextState({ filter: new Set() })
      render(<Filters />)

      const checkbox = screen.getByLabelText(/baixa/i)
      await user.click(checkbox)

      expect(mockTaskContext.updateFilter).toHaveBeenCalledWith('low', 'add')
    })

    it('should call updateFilter with "remove" when low priority checkbox is unchecked', async () => {
      setMockTaskContextState({ filter: new Set(['low']) })
      render(<Filters />)

      const checkbox = screen.getByLabelText(/baixa/i)
      await user.click(checkbox)

      expect(mockTaskContext.updateFilter).toHaveBeenCalledWith('low', 'remove')
    })
  })
})
