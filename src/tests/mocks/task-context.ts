import type {
  Task,
  TaskContextType,
  TaskFilter,
  TaskPriority,
} from '@/contexts/task-context'

export const mockTaskContextFunctions = {
  addTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
  getTask: jest.fn(),
  updateFilter: jest.fn(),
}

export const mockTaskContextState = {
  tasks: [] as Task[],
  filter: 'all' as TaskFilter,
  meta: {
    total: 0,
    done: 0,
  },
}

export const mockTaskContext: TaskContextType = {
  ...mockTaskContextState,
  ...mockTaskContextFunctions,
}

export const createMockTask = (overrides: Partial<Task> = {}): Task => ({
  id: `task-${Math.random().toString(36).substring(2, 9)}`,
  description: 'Tarefa de teste',
  priority: 'regular' as TaskPriority,
  isDone: false,
  ...overrides,
})

export const createMockTasks = (
  count: number,
  overrides: Partial<Task>[] = [],
): Task[] => {
  return Array.from({ length: count }, (_, index) =>
    createMockTask({
      description: `Tarefa ${index + 1}`,
      ...overrides[index],
    }),
  )
}

export const mockTasksPreset = {
  empty: [],
  withDifferentPriorities: [
    createMockTask({
      id: '1',
      description: 'Tarefa alta prioridade',
      priority: 'high',
      isDone: false,
    }),
    createMockTask({
      id: '2',
      description: 'Tarefa prioridade normal',
      priority: 'regular',
      isDone: true,
    }),
    createMockTask({
      id: '3',
      description: 'Tarefa baixa prioridade',
      priority: 'low',
      isDone: false,
    }),
  ],
  allCompleted: [
    createMockTask({
      id: '1',
      description: 'Tarefa concluída 1',
      priority: 'high',
      isDone: true,
    }),
    createMockTask({
      id: '2',
      description: 'Tarefa concluída 2',
      priority: 'regular',
      isDone: true,
    }),
  ],
  allPending: [
    createMockTask({
      id: '1',
      description: 'Tarefa pendente 1',
      priority: 'high',
      isDone: false,
    }),
    createMockTask({
      id: '2',
      description: 'Tarefa pendente 2',
      priority: 'regular',
      isDone: false,
    }),
  ],
}

export const resetTaskContextMocks = () => {
  mockTaskContextFunctions.addTask.mockReset()
  mockTaskContextFunctions.updateTask.mockReset()
  mockTaskContextFunctions.deleteTask.mockReset()
  mockTaskContextFunctions.getTask.mockReset()
  mockTaskContextFunctions.updateFilter.mockReset()

  mockTaskContext.tasks = mockTaskContextState.tasks
  mockTaskContext.filter = mockTaskContextState.filter
  mockTaskContext.meta = mockTaskContextState.meta
}

export const setMockTaskContextState = (
  newState: Partial<typeof mockTaskContextState>,
) => {
  Object.assign(mockTaskContext, newState)
}

export const useTask = jest.fn(() => mockTaskContext)

export const TASK_PRIORITIES = ['high', 'regular', 'low'] as const
export type { Task, TaskFilter, TaskPriority }
