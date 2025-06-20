import { render, screen } from '@testing-library/react'

import {
  createMockTask,
  resetTaskContextMocks,
  setMockTaskContextState,
} from '@/tests/mocks/task-context'

import { ListTasks } from './list-tasks'
import * as TaskCardModule from './task-card'

jest.mock('./task-card', () => ({
  TaskCard: jest.fn(({ task }) => (
    <div data-testid="mock-task-card" role="listitem">
      {task.description}
    </div>
  )),
}))

describe('ListTasks Component', () => {
  beforeEach(() => {
    resetTaskContextMocks()
    jest.clearAllMocks()
  })

  describe('Rendering with Tasks', () => {
    it('should render TaskCard components when tasks exist', () => {
      const tasks = [
        createMockTask({ id: '1', description: 'Task 1' }),
        createMockTask({ id: '2', description: 'Task 2' }),
      ]
      setMockTaskContextState({ tasks })
      render(<ListTasks />)

      expect(TaskCardModule.TaskCard).toHaveBeenCalledTimes(2)
      expect(TaskCardModule.TaskCard).toHaveBeenCalledWith(
        expect.objectContaining({ task: tasks[0] }),
        undefined,
      )
      expect(TaskCardModule.TaskCard).toHaveBeenCalledWith(
        expect.objectContaining({ task: tasks[1] }),
        undefined,
      )
      expect(screen.getByText('Task 1')).toBeInTheDocument()
      expect(screen.getByText('Task 2')).toBeInTheDocument()
      expect(
        screen.queryByText(/você ainda não tem tarefas cadastradas/i),
      ).not.toBeInTheDocument()
    })

    it('should render a single TaskCard when only one task exists', () => {
      const tasks = [createMockTask({ id: '1', description: 'Single Task' })]
      setMockTaskContextState({ tasks })
      render(<ListTasks />)

      expect(TaskCardModule.TaskCard).toHaveBeenCalledTimes(1)
      expect(TaskCardModule.TaskCard).toHaveBeenCalledWith(
        expect.objectContaining({ task: tasks[0] }),
        undefined,
      )
      expect(screen.getByText('Single Task')).toBeInTheDocument()
      expect(
        screen.queryByText(/você ainda não tem tarefas cadastradas/i),
      ).not.toBeInTheDocument()
    })
  })

  describe('Rendering with No Tasks', () => {
    it('should render empty state when no tasks exist', () => {
      setMockTaskContextState({ tasks: [] })
      render(<ListTasks />)

      expect(TaskCardModule.TaskCard).not.toHaveBeenCalled()
      expect(
        screen.getByText(/você ainda não tem tarefas cadastradas/i),
      ).toBeInTheDocument()
      expect(
        screen.getByText(/crie tarefas e organize seus itens a fazer/i),
      ).toBeInTheDocument()

      expect(
        screen.getByRole('empty-img', { hidden: true }),
      ).toBeInTheDocument()
    })
  })

  describe('Context Integration', () => {
    it('should update rendered tasks when context tasks change', () => {
      const initialTasks = [
        createMockTask({ id: '1', description: 'Initial Task' }),
      ]
      setMockTaskContextState({ tasks: initialTasks })
      const { rerender } = render(<ListTasks />)

      expect(screen.getByText('Initial Task')).toBeInTheDocument()

      const newTasks = [
        createMockTask({ id: '2', description: 'New Task 1' }),
        createMockTask({ id: '3', description: 'New Task 2' }),
      ]
      setMockTaskContextState({ tasks: newTasks })
      rerender(<ListTasks />)

      expect(screen.getByText('New Task 1')).toBeInTheDocument()
      expect(screen.getByText('New Task 2')).toBeInTheDocument()
      expect(screen.queryByText('Initial Task')).not.toBeInTheDocument()
    })
  })
})
