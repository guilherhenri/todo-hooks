import '@styles/components/_create-form.scss'

import { PlusCircleIcon } from '@phosphor-icons/react'
import { type FormEvent, useState } from 'react'
import { v7 as uuid } from 'uuid'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface Task {
  description: string
  priority?: 'high' | 'regular' | 'low'
}

export function CreateForm() {
  const [task, setTask] = useState<Task>({
    description: '',
    priority: undefined,
  })

  function handleOnValueChange<F extends keyof Task>(field: F, value: Task[F]) {
    setTask((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  function handleCreateTask(event: FormEvent) {
    event.preventDefault()

    if (task.description.trim() && task.priority) {
      const currentTasks = JSON.parse(localStorage.getItem('tasks') ?? '[]')
      const newTask = {
        id: uuid(),
        ...task,
      }

      currentTasks.push(newTask)
      localStorage.setItem('tasks', JSON.stringify(currentTasks))

      setTask({
        description: '',
        priority: undefined,
      })
    }
  }

  const isFormValid = task.description.trim() && task.priority

  return (
    <form className="create-form" onSubmit={handleCreateTask}>
      <input
        className="create-form__input"
        type="text"
        name="title"
        placeholder="Adicione uma nova tarefa"
        value={task?.description}
        onChange={(e) => handleOnValueChange('description', e.target.value)}
      />

      <Select
        name="priority"
        value={task?.priority}
        onValueChange={(value) =>
          handleOnValueChange('priority', value as Task['priority'])
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Prioridade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="high">Alta</SelectItem>
          <SelectItem value="regular">Normal</SelectItem>
          <SelectItem value="low">Baixa</SelectItem>
        </SelectContent>
      </Select>

      <button
        className="create-form__submit-button"
        type="submit"
        disabled={!isFormValid}
      >
        Criar
        <PlusCircleIcon size={20} />
      </button>
    </form>
  )
}
