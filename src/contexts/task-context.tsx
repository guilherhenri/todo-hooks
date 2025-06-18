import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { v7 as uuid } from 'uuid'

import { useLocalStorage } from '@/hooks/local-storage'

export interface Task {
  id: string
  description: string
  priority: 'high' | 'regular' | 'low'
  isDone: boolean
}

type TaskForm = Omit<Task, 'id' | 'isDone'>

interface TaskContextType {
  tasks: Task[]
  addTask: (task: TaskForm) => void
  updateTask: (task: Task) => void
  deleteTask: (id: string) => void
}

const TaskContext = createContext({} as TaskContextType)

// eslint-disable-next-line react-refresh/only-export-components
export const useTask = () => {
  return useContext(TaskContext)
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])

  const { syncStorage, loadStorage } = useLocalStorage<Task[]>()

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

  useEffect(() => {
    const list = loadStorage('tasks')

    setTasks(list)
  }, [loadStorage])

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}
