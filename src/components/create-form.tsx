import '@styles/components/_create-form.scss'

import { PlusCircleIcon } from '@phosphor-icons/react'
import { type FormEvent, useMemo, useState } from 'react'

import { useTask } from '@/contexts/task-context'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface TaskForm {
  description: string
  priority?: 'high' | 'regular' | 'low'
}

export function CreateForm() {
  const { addTask } = useTask()

  const [task, setTask] = useState<TaskForm>({
    description: '',
    priority: undefined,
  })

  function handleOnValueChange<F extends keyof TaskForm>(
    field: F,
    value: TaskForm[F],
  ) {
    setTask((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  function handleCreateTask(event: FormEvent) {
    event.preventDefault()

    if (task.description.trim() && task.priority) {
      addTask({
        description: task.description,
        priority: task.priority,
      })

      setTask({
        description: '',
        priority: undefined,
      })
    }
  }

  const isFormValid = useMemo(() => {
    if (task) {
      return task.description.trim() && task.priority
    }

    return false
  }, [task])

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
        value={task.priority ?? ''}
        onValueChange={(value) =>
          handleOnValueChange('priority', value as TaskForm['priority'])
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
