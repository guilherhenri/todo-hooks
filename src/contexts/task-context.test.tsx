import { act, renderHook } from '@testing-library/react'
import { type ReactNode } from 'react'

import {
  type Task,
  type TaskForm,
  TaskProvider,
  useTask,
} from '@/contexts/task-context'

const mockSyncStorage = jest.fn()
const mockLoadStorage = jest.fn()

jest.mock('@/hooks/local-storage', () => ({
  useLocalStorage: () => ({
    syncStorage: mockSyncStorage,
    loadStorage: mockLoadStorage,
  }),
}))

const wrapper = ({ children }: { children: ReactNode }) => (
  <TaskProvider>{children}</TaskProvider>
)

describe('TaskContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockLoadStorage.mockReturnValue([])
  })

  describe('useTask hook', () => {
    it('should be able to provide task context values', () => {
      const { result } = renderHook(() => useTask(), { wrapper })

      expect(result.current.tasks).toEqual([])
      expect(result.current.filter).toBe('all')
      expect(result.current.meta).toEqual({ total: 0, done: 0 })
      expect(typeof result.current.getTask).toBe('function')
      expect(typeof result.current.addTask).toBe('function')
      expect(typeof result.current.updateTask).toBe('function')
      expect(typeof result.current.deleteTask).toBe('function')
      expect(typeof result.current.updateFilter).toBe('function')
    })
  })

  describe('addTask', () => {
    it('should be able to add a new task', () => {
      const { result } = renderHook(() => useTask(), { wrapper })

      const newTask: TaskForm = {
        description: 'Test task',
        priority: 'high',
      }

      act(() => {
        result.current.addTask(newTask)
      })

      expect(mockSyncStorage).toHaveBeenCalledWith('tasks', [
        {
          id: 'mocked-uuid-id',
          description: 'Test task',
          priority: 'high',
          isDone: false,
        },
      ])
    })

    it('should be able to add multiple tasks', () => {
      mockLoadStorage.mockReturnValue([])
      const { result } = renderHook(() => useTask(), { wrapper })

      const firstTask: TaskForm = {
        description: 'First task',
        priority: 'high',
      }

      const secondTask: TaskForm = {
        description: 'Second task',
        priority: 'low',
      }

      act(() => {
        result.current.addTask(firstTask)
      })

      act(() => {
        result.current.addTask(secondTask)
      })

      expect(mockSyncStorage).toHaveBeenCalledTimes(2)
      expect(mockSyncStorage).toHaveBeenLastCalledWith('tasks', [
        {
          id: 'mocked-uuid-id',
          description: 'First task',
          priority: 'high',
          isDone: false,
        },
        {
          id: 'mocked-uuid-id',
          description: 'Second task',
          priority: 'low',
          isDone: false,
        },
      ])
    })
  })

  describe('updateTask', () => {
    it('should be able to update an existing task', () => {
      const existingTasks: Task[] = [
        {
          id: '1',
          description: 'Existing task',
          priority: 'regular',
          isDone: false,
        },
      ]

      mockLoadStorage.mockReturnValue(existingTasks)
      const { result } = renderHook(() => useTask(), { wrapper })

      const updatedTask: Task = {
        id: '1',
        description: 'Updated task',
        priority: 'high',
        isDone: true,
      }

      act(() => {
        result.current.updateTask(updatedTask)
      })

      expect(mockSyncStorage).toHaveBeenCalledWith('tasks', [updatedTask])
    })

    it('should not be able to update a non-existing task', () => {
      const existingTasks: Task[] = [
        {
          id: '1',
          description: 'Existing task',
          priority: 'regular',
          isDone: false,
        },
      ]

      mockLoadStorage.mockReturnValue(existingTasks)
      const { result } = renderHook(() => useTask(), { wrapper })

      const nonExistingTask: Task = {
        id: '999',
        description: 'Non-existing task',
        priority: 'high',
        isDone: true,
      }

      act(() => {
        result.current.updateTask(nonExistingTask)
      })

      expect(mockSyncStorage).toHaveBeenCalledWith('tasks', existingTasks)
    })
  })

  describe('deleteTask', () => {
    it('should be able to delete an existing task', () => {
      const existingTasks: Task[] = [
        {
          id: '1',
          description: 'Task to delete',
          priority: 'regular',
          isDone: false,
        },
        {
          id: '2',
          description: 'Task to keep',
          priority: 'high',
          isDone: true,
        },
      ]

      mockLoadStorage.mockReturnValue(existingTasks)
      const { result } = renderHook(() => useTask(), { wrapper })

      act(() => {
        result.current.deleteTask('1')
      })

      expect(mockSyncStorage).toHaveBeenCalledWith('tasks', [
        {
          id: '2',
          description: 'Task to keep',
          priority: 'high',
          isDone: true,
        },
      ])
    })

    it('should not be able to delete a non-existing task', () => {
      const existingTasks: Task[] = [
        {
          id: '1',
          description: 'Existing task',
          priority: 'regular',
          isDone: false,
        },
      ]

      mockLoadStorage.mockReturnValue(existingTasks)
      const { result } = renderHook(() => useTask(), { wrapper })

      act(() => {
        result.current.deleteTask('999')
      })

      expect(mockSyncStorage).toHaveBeenCalledWith('tasks', existingTasks)
    })
  })

  describe('getTask', () => {
    it('should be able to get an existing task by id', () => {
      const existingTasks: Task[] = [
        {
          id: '1',
          description: 'Task 1',
          priority: 'regular',
          isDone: false,
        },
        {
          id: '2',
          description: 'Task 2',
          priority: 'high',
          isDone: true,
        },
      ]

      mockLoadStorage.mockReturnValue(existingTasks)
      const { result } = renderHook(() => useTask(), { wrapper })

      const task = result.current.getTask('1')

      expect(task).toEqual({
        id: '1',
        description: 'Task 1',
        priority: 'regular',
        isDone: false,
      })
    })

    it('should not be able to get a non-existing task', () => {
      const existingTasks: Task[] = [
        {
          id: '1',
          description: 'Task 1',
          priority: 'regular',
          isDone: false,
        },
      ]

      mockLoadStorage.mockReturnValue(existingTasks)
      const { result } = renderHook(() => useTask(), { wrapper })

      const task = result.current.getTask('999')

      expect(task).toBeUndefined()
    })
  })

  describe('updateFilter', () => {
    it('should be able to set filter to all', () => {
      const { result } = renderHook(() => useTask(), { wrapper })

      act(() => {
        result.current.updateFilter('all', 'add')
      })

      expect(result.current.filter).toBe('all')
    })

    it('should be able to add a specific priority to filter when current filter is all', () => {
      const { result } = renderHook(() => useTask(), { wrapper })

      act(() => {
        result.current.updateFilter('high', 'add')
      })

      expect(result.current.filter).toEqual(new Set(['high']))
    })

    it('should be able to remove a specific priority from filter when current filter is all', () => {
      const { result } = renderHook(() => useTask(), { wrapper })

      act(() => {
        result.current.updateFilter('high', 'remove')
      })

      expect(result.current.filter).toEqual(new Set(['regular', 'low']))
    })

    it('should be able to add priority to existing filter set', () => {
      const { result } = renderHook(() => useTask(), { wrapper })

      // First set filter to have only 'high'
      act(() => {
        result.current.updateFilter('high', 'add')
      })

      // Then add 'regular'
      act(() => {
        result.current.updateFilter('regular', 'add')
      })

      expect(result.current.filter).toEqual(new Set(['high', 'regular']))
    })

    it('should be able to remove priority from existing filter set', () => {
      const { result } = renderHook(() => useTask(), { wrapper })

      // First add priorities
      act(() => {
        result.current.updateFilter('high', 'add')
      })

      act(() => {
        result.current.updateFilter('regular', 'add')
      })

      // Then remove one
      act(() => {
        result.current.updateFilter('high', 'remove')
      })

      expect(result.current.filter).toEqual(new Set(['regular']))
    })

    it('should be able to toggle priority in filter', () => {
      const { result } = renderHook(() => useTask(), { wrapper })

      // First add a priority
      act(() => {
        result.current.updateFilter('high', 'add')
      })

      // Toggle it (should remove)
      act(() => {
        result.current.updateFilter('high', 'toggle')
      })

      expect(result.current.filter).toBe('all')

      // Toggle again (should add)
      act(() => {
        result.current.updateFilter('high', 'toggle')
      })

      expect(result.current.filter).toEqual(new Set(['high']))
    })

    it('should be able to set filter to all when removing all priorities', () => {
      const { result } = renderHook(() => useTask(), { wrapper })

      // Add a priority
      act(() => {
        result.current.updateFilter('high', 'add')
      })

      // Remove it
      act(() => {
        result.current.updateFilter('high', 'remove')
      })

      expect(result.current.filter).toBe('all')
    })
  })

  describe('tasks filtering and sorting', () => {
    it('should be able to filter tasks by priority', () => {
      const existingTasks: Task[] = [
        {
          id: '1',
          description: 'High priority task',
          priority: 'high',
          isDone: false,
        },
        {
          id: '2',
          description: 'Regular priority task',
          priority: 'regular',
          isDone: false,
        },
        {
          id: '3',
          description: 'Low priority task',
          priority: 'low',
          isDone: false,
        },
      ]

      mockLoadStorage.mockReturnValue(existingTasks)
      const { result } = renderHook(() => useTask(), { wrapper })

      // Set filter to only show high priority tasks
      act(() => {
        result.current.updateFilter('high', 'add')
      })

      expect(result.current.tasks).toEqual([
        {
          id: '1',
          description: 'High priority task',
          priority: 'high',
          isDone: false,
        },
      ])
    })

    it('should be able to sort tasks by priority order', () => {
      const existingTasks: Task[] = [
        {
          id: '1',
          description: 'Low priority task',
          priority: 'low',
          isDone: false,
        },
        {
          id: '2',
          description: 'High priority task',
          priority: 'high',
          isDone: false,
        },
        {
          id: '3',
          description: 'Regular priority task',
          priority: 'regular',
          isDone: false,
        },
      ]

      mockLoadStorage.mockReturnValue(existingTasks)
      const { result } = renderHook(() => useTask(), { wrapper })

      expect(result.current.tasks).toEqual([
        {
          id: '2',
          description: 'High priority task',
          priority: 'high',
          isDone: false,
        },
        {
          id: '3',
          description: 'Regular priority task',
          priority: 'regular',
          isDone: false,
        },
        {
          id: '1',
          description: 'Low priority task',
          priority: 'low',
          isDone: false,
        },
      ])
    })

    it('should be able to show all tasks when filter is all', () => {
      const existingTasks: Task[] = [
        {
          id: '1',
          description: 'High priority task',
          priority: 'high',
          isDone: false,
        },
        {
          id: '2',
          description: 'Regular priority task',
          priority: 'regular',
          isDone: false,
        },
        {
          id: '3',
          description: 'Low priority task',
          priority: 'low',
          isDone: false,
        },
      ]

      mockLoadStorage.mockReturnValue(existingTasks)
      const { result } = renderHook(() => useTask(), { wrapper })

      expect(result.current.filter).toBe('all')
      expect(result.current.tasks).toHaveLength(3)
    })
  })

  describe('meta information', () => {
    it('should be able to calculate total and done tasks correctly', () => {
      const existingTasks: Task[] = [
        {
          id: '1',
          description: 'Done task',
          priority: 'high',
          isDone: true,
        },
        {
          id: '2',
          description: 'Pending task',
          priority: 'regular',
          isDone: false,
        },
        {
          id: '3',
          description: 'Another done task',
          priority: 'low',
          isDone: true,
        },
      ]

      mockLoadStorage.mockReturnValue(existingTasks)
      const { result } = renderHook(() => useTask(), { wrapper })

      expect(result.current.meta).toEqual({
        total: 3,
        done: 2,
      })
    })

    it('should be able to handle empty task list in meta', () => {
      mockLoadStorage.mockReturnValue([])
      const { result } = renderHook(() => useTask(), { wrapper })

      expect(result.current.meta).toEqual({
        total: 0,
        done: 0,
      })
    })
  })

  describe('localStorage integration', () => {
    it('should be able to load tasks from localStorage on mount', () => {
      const storedTasks: Task[] = [
        {
          id: '1',
          description: 'Stored task',
          priority: 'high',
          isDone: false,
        },
      ]

      mockLoadStorage.mockReturnValue(storedTasks)
      renderHook(() => useTask(), { wrapper })

      expect(mockLoadStorage).toHaveBeenCalledWith('tasks')
    })

    it('should be able to sync tasks to localStorage when adding task', () => {
      const { result } = renderHook(() => useTask(), { wrapper })

      const newTask: TaskForm = {
        description: 'New task',
        priority: 'regular',
      }

      act(() => {
        result.current.addTask(newTask)
      })

      expect(mockSyncStorage).toHaveBeenCalledWith('tasks', expect.any(Array))
    })

    it('should be able to sync tasks to localStorage when updating task', () => {
      const existingTasks: Task[] = [
        {
          id: '1',
          description: 'Task to update',
          priority: 'regular',
          isDone: false,
        },
      ]

      mockLoadStorage.mockReturnValue(existingTasks)
      const { result } = renderHook(() => useTask(), { wrapper })

      const updatedTask: Task = {
        id: '1',
        description: 'Updated task',
        priority: 'high',
        isDone: true,
      }

      act(() => {
        result.current.updateTask(updatedTask)
      })

      expect(mockSyncStorage).toHaveBeenCalledWith('tasks', [updatedTask])
    })

    it('should be able to sync tasks to localStorage when deleting task', () => {
      const existingTasks: Task[] = [
        {
          id: '1',
          description: 'Task to delete',
          priority: 'regular',
          isDone: false,
        },
      ]

      mockLoadStorage.mockReturnValue(existingTasks)
      const { result } = renderHook(() => useTask(), { wrapper })

      act(() => {
        result.current.deleteTask('1')
      })

      expect(mockSyncStorage).toHaveBeenCalledWith('tasks', [])
    })
  })
})
