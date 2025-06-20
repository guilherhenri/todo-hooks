/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { v7 as uuid } from 'uuid'

import { useLocalStorage } from '@/hooks/local-storage'

export const TASK_PRIORITIES = ['high', 'regular', 'low'] as const
export type TaskPriority = (typeof TASK_PRIORITIES)[number]

export interface Task {
  id: string
  description: string
  priority: TaskPriority
  isDone: boolean
}

export type TaskForm = Omit<Task, 'id' | 'isDone'>

export type TaskFilter = Set<TaskPriority> | 'all'

type Meta = {
  total: number
  done: number
}

const PRIORITY_ORDER: Record<TaskPriority, number> = {
  high: 1,
  regular: 2,
  low: 3,
} as const

export interface TaskContextType {
  tasks: Task[]
  filter: TaskFilter
  meta: Meta
  getTask: (id: string) => Task | undefined
  addTask: (task: TaskForm) => void
  updateTask: (task: Task) => void
  deleteTask: (id: string) => void
  updateFilter: (
    value: 'all' | Task['priority'],
    action: 'add' | 'remove' | 'toggle',
  ) => void
}

const TaskContext = createContext({} as TaskContextType)

export const useTask = () => {
  return useContext(TaskContext)
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<TaskFilter>('all')
  const [meta, setMeta] = useState<Meta>({
    total: 0,
    done: 0,
  })

  const { syncStorage, loadStorage } = useLocalStorage<Task[]>()

  function getTask(id: string) {
    return tasks.find((task) => task.id === id)
  }

  function addTask(task: TaskForm) {
    const newList: Task[] = [
      ...tasks,
      {
        id: uuid(),
        isDone: false,
        ...task,
      },
    ]

    setTasks(newList)
    syncStorage('tasks', newList)
  }

  function updateTask(task: Task) {
    const newList = tasks.map((item) => {
      if (item.id === task.id) {
        return {
          ...item,
          ...task,
        }
      }

      return item
    })

    setTasks(newList)
    syncStorage('tasks', newList)
  }

  function deleteTask(id: string) {
    const newList = tasks.filter((task) => task.id !== id)

    setTasks(newList)
    syncStorage('tasks', newList)
  }

  function updateFilter(
    value: TaskPriority | 'all',
    action: 'add' | 'remove' | 'toggle',
  ) {
    setFilter((prevFilter) => {
      if (value === 'all') {
        return action === 'add' ? 'all' : new Set<TaskPriority>()
      }

      if (prevFilter === 'all') {
        return action === 'add' || action === 'toggle'
          ? new Set([value])
          : new Set(TASK_PRIORITIES.filter((p) => p !== value))
      }

      const newFilter = new Set(prevFilter)

      if (action === 'add') {
        newFilter.add(value)
      } else if (action === 'remove') {
        newFilter.delete(value)
      } else if (action === 'toggle') {
        if (newFilter.has(value)) {
          newFilter.delete(value)
        } else {
          newFilter.add(value)
        }
      }

      return newFilter.size === 0 ? 'all' : newFilter
    })
  }

  useEffect(() => {
    const list = loadStorage('tasks')

    setMeta({
      total: list.length,
      done: list.filter((task) => task.isDone).length,
    })
  }, [loadStorage])

  useEffect(() => {
    let filtered = loadStorage('tasks')

    if (filter !== 'all') {
      filtered = filtered.filter((task) => filter.has(task.priority))
    }

    filtered = filtered.sort(
      (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority],
    )

    setTasks(filtered)
  }, [loadStorage, filter])

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filter,
        meta,
        getTask,
        addTask,
        updateTask,
        deleteTask,
        updateFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
