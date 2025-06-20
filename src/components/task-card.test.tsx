import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  createMockTask,
  mockTaskContext,
  resetTaskContextMocks,
} from '@/tests/mocks/task-context'

import * as EditFormModule from './edit-form'
import { TaskCard } from './task-card'

jest.mock('./edit-form', () => ({
  EditForm: jest.fn(() => <div>Mocked EditForm</div>),
}))

describe('TaskCard Component', () => {
  const user = userEvent.setup()

  const task = createMockTask({
    id: '1',
    description: 'Test Task',
    priority: 'high',
    isDone: false,
  })

  beforeEach(() => {
    resetTaskContextMocks()
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render task description, priority, and completion status', () => {
      render(<TaskCard task={task} />)

      expect(screen.getByText('Test Task')).toBeInTheDocument()
      expect(screen.getByText('Alta')).toBeInTheDocument()
      expect(screen.getByRole('checkbox')).not.toBeChecked()
    })

    it('should render completed task with checked checkbox', () => {
      const completedTask = createMockTask({
        id: '2',
        description: 'Completed Task',
        priority: 'regular',
        isDone: true,
      })
      render(<TaskCard task={completedTask} />)

      expect(screen.getByText('Completed Task')).toBeInTheDocument()
      expect(screen.getByText('Normal')).toBeInTheDocument()
      expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('should render task with low priority', () => {
      const lowPriorityTask = createMockTask({
        id: '3',
        description: 'Low Priority Task',
        priority: 'low',
        isDone: false,
      })
      render(<TaskCard task={lowPriorityTask} />)

      expect(screen.getByText('Low Priority Task')).toBeInTheDocument()
      expect(screen.getByText('Baixa')).toBeInTheDocument()
      expect(screen.getByRole('checkbox')).not.toBeChecked()
    })

    it('should render edit and delete buttons', () => {
      render(<TaskCard task={task} />)

      expect(
        screen.getByRole('button', { name: /Editar tarefa/i }),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /Apagar tarefa/i }),
      ).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('should call updateTask when checkbox is toggled to checked', async () => {
      render(<TaskCard task={task} />)

      const checkbox = screen.getByRole('checkbox')
      await user.click(checkbox)

      expect(mockTaskContext.updateTask).toHaveBeenCalledWith({
        id: '1',
        description: 'Test Task',
        priority: 'high',
        isDone: true,
      })
    })

    it('should call updateTask when checkbox is toggled to unchecked', async () => {
      const completedTask = createMockTask({
        id: '2',
        description: 'Completed Task',
        priority: 'regular',
        isDone: true,
      })
      render(<TaskCard task={completedTask} />)

      const checkbox = screen.getByRole('checkbox')
      await user.click(checkbox)

      expect(mockTaskContext.updateTask).toHaveBeenCalledWith({
        id: '2',
        description: 'Completed Task',
        priority: 'regular',
        isDone: false,
      })
    })

    it('should open dialog and render EditForm when edit button is clicked', async () => {
      render(<TaskCard task={task} />)

      const editButton = screen.getByRole('button', { name: /Editar tarefa/i })
      await user.click(editButton)

      expect(screen.getByText('Editar tarefa')).toBeInTheDocument()
      expect(EditFormModule.EditForm).toHaveBeenCalledWith(
        expect.objectContaining({
          id: '1',
          closeDialog: expect.any(Function),
        }),
        undefined,
      )
      expect(screen.getByText('Mocked EditForm')).toBeInTheDocument()
    })

    it('should call deleteTask when delete button is clicked', async () => {
      render(<TaskCard task={task} />)

      const deleteButton = screen.getByRole('button', {
        name: /Apagar tarefa/i,
      })
      await user.click(deleteButton)

      expect(mockTaskContext.deleteTask).toHaveBeenCalledWith('1')
    })
  })

  describe('Dialog Management', () => {
    it('should close dialog when closeDialog is called', async () => {
      render(<TaskCard task={task} />)

      const editButton = screen.getByRole('button', { name: /Editar tarefa/i })
      await user.click(editButton)

      expect(screen.getByText('Editar tarefa')).toBeInTheDocument()

      await act(async () => {
        const editFormProps = (EditFormModule.EditForm as jest.Mock).mock
          .calls[0][0]
        editFormProps.closeDialog()
      })

      expect(screen.queryByText('Editar tarefa')).not.toBeInTheDocument()
      expect(screen.queryByText('Mocked EditForm')).not.toBeInTheDocument()
    })
  })
})
