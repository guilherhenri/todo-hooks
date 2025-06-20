import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  createMockTask,
  mockTaskContextFunctions,
  resetTaskContextMocks,
} from '@/tests/mocks/task-context'

import { EditForm } from './edit-form'

const mockCloseDialog = jest.fn()

describe('EditForm', () => {
  beforeEach(() => {
    resetTaskContextMocks()
  })

  it('should display loading state when task is not loaded', () => {
    mockTaskContextFunctions.getTask.mockReturnValue(undefined)

    render(<EditForm id="1" closeDialog={mockCloseDialog} />)

    expect(screen.getByRole('status')).toHaveTextContent('Carregando...')
  })

  it('should render form with task data when task is loaded', async () => {
    const mockTask = createMockTask({
      id: '1',
      description: 'Test Task',
      priority: 'regular',
    })
    mockTaskContextFunctions.getTask.mockReturnValue(mockTask)

    render(<EditForm id="1" closeDialog={mockCloseDialog} />)

    await waitFor(() => {
      expect(screen.getByRole('form')).toBeInTheDocument()
      expect(screen.getByLabelText(/Descrição da tarefa/i)).toHaveValue(
        'Test Task',
      )
    })
  })

  it('should update description when user types in the input', async () => {
    const mockTask = createMockTask({
      id: '1',
      description: 'Test Task',
      priority: 'regular',
    })
    mockTaskContextFunctions.getTask.mockReturnValue(mockTask)
    const user = userEvent.setup()

    render(<EditForm id="1" closeDialog={mockCloseDialog} />)

    const input = screen.getByLabelText(/Descrição da tarefa/i)
    await user.clear(input)
    await user.type(input, 'Updated Task')

    expect(input).toHaveValue('Updated Task')
  })

  it('should call updateTask and closeDialog when form is submitted with valid data', async () => {
    const mockTask = createMockTask({
      id: '1',
      description: 'Test Task',
      priority: 'regular',
    })
    mockTaskContextFunctions.getTask.mockReturnValue(mockTask)
    const user = userEvent.setup()

    render(<EditForm id="1" closeDialog={mockCloseDialog} />)

    const submitButton = screen.getByRole('button', { name: /Atualizar/i })
    await user.click(submitButton)

    expect(mockTaskContextFunctions.updateTask).toHaveBeenCalledWith(mockTask)
    expect(mockCloseDialog).toHaveBeenCalled()
  })

  it('should not enable submit button when description is empty', async () => {
    const mockTask = createMockTask({
      id: '1',
      description: '',
      priority: 'regular',
    })
    mockTaskContextFunctions.getTask.mockReturnValue(mockTask)

    render(<EditForm id="1" closeDialog={mockCloseDialog} />)

    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /Atualizar/i })
      expect(submitButton).toBeDisabled()
    })
  })

  it('should not enable submit button when priority is not set', async () => {
    const mockTask = createMockTask({
      id: '1',
      description: 'Test Task',
      priority: undefined,
    })
    mockTaskContextFunctions.getTask.mockReturnValue(mockTask)

    render(<EditForm id="1" closeDialog={mockCloseDialog} />)

    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /Atualizar/i })
      expect(submitButton).toBeDisabled()
    })
  })

  it('should enable submit button when form is valid', async () => {
    const mockTask = createMockTask({
      id: '1',
      description: 'Test Task',
      priority: 'regular',
    })
    mockTaskContextFunctions.getTask.mockReturnValue(mockTask)

    render(<EditForm id="1" closeDialog={mockCloseDialog} />)

    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /Atualizar/i })
      expect(submitButton).not.toBeDisabled()
    })
  })
})
