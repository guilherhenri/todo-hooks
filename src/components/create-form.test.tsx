import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { resetTaskContextMocks } from '@/tests/mocks/task-context'

import { CreateForm } from './create-form'

jest.mock('@phosphor-icons/react', () => ({
  PlusCircleIcon: ({ size }: { size: number }) => (
    <div data-testid={`plus-icon-${size}`} />
  ),
  CaretDownIcon: ({ size }: { size: number }) => (
    <div data-testid={`caret-down-${size}`} />
  ),
  CheckIcon: ({ size }: { size: number }) => (
    <div data-testid={`check-icon-${size}`} />
  ),
}))

describe('CreateForm', () => {
  beforeEach(() => {
    resetTaskContextMocks()
  })

  describe('Initial rendering', () => {
    it('should be able to render all form elements correctly', () => {
      render(<CreateForm />)

      expect(
        screen.getByPlaceholderText('Adicione uma nova tarefa'),
      ).toBeInTheDocument()
      expect(screen.getByRole('combobox')).toBeInTheDocument()
      expect(screen.getByText('Prioridade')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /criar/i })).toBeInTheDocument()
    })

    it('should be able to render submit button as disabled initially', () => {
      render(<CreateForm />)

      const submitButton = screen.getByRole('button', { name: /criar/i })
      expect(submitButton).toBeDisabled()
    })

    it('should be able to render input field empty initially', () => {
      render(<CreateForm />)

      const input = screen.getByPlaceholderText('Adicione uma nova tarefa')
      expect(input).toHaveValue('')
    })

    it('should be able to render priority select with placeholder', () => {
      render(<CreateForm />)

      expect(screen.getByText('Prioridade')).toBeInTheDocument()
    })
  })

  describe('Form interaction', () => {
    it('should be able to type in the description input field', async () => {
      const user = userEvent.setup()
      render(<CreateForm />)

      const input = screen.getByPlaceholderText('Adicione uma nova tarefa')
      await user.type(input, 'Nova tarefa de teste')

      expect(input).toHaveValue('Nova tarefa de teste')
    })
  })

  describe('Form validation', () => {
    it('should not be able to enable submit button with only description filled', async () => {
      const user = userEvent.setup()
      render(<CreateForm />)

      const input = screen.getByPlaceholderText('Adicione uma nova tarefa')
      await user.type(input, 'Nova tarefa')

      const submitButton = screen.getByRole('button', { name: /criar/i })
      expect(submitButton).toBeDisabled()
    })
  })
})
