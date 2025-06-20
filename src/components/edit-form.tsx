import '@styles/components/_edit-form.scss'

import { type FormEvent, useEffect, useMemo, useState } from 'react'

import { type Task, useTask } from '@/contexts/task-context'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export function EditForm({
  id,
  closeDialog,
}: {
  id: string
  closeDialog: () => void
}) {
  const { getTask, updateTask } = useTask()

  const [task, setTask] = useState<Task | undefined>()

  function handleOnValueChange<F extends keyof Task>(field: F, value: Task[F]) {
    setTask((previous) => {
      if (previous) {
        return {
          ...previous,
          [field]: value,
        }
      }
    })
  }

  function handleUpdateTask(event: FormEvent) {
    event.preventDefault()

    if (task) {
      updateTask(task)
      closeDialog()
    }
  }

  useEffect(() => {
    const data = getTask(id)

    setTask(data)
  }, [id, getTask])

  const isFormValid = useMemo(() => {
    if (task) {
      return !!task.description.trim() && !!task.priority
    }

    return false
  }, [task])

  if (!task) {
    return (
      <div className="edit-form__load" role="status">
        <span>Carregando...</span>
      </div>
    )
  }

  return (
    <form className="edit-form" onSubmit={handleUpdateTask} role="form">
      <input
        className="edit-form__input"
        type="text"
        name="description"
        placeholder="Adicione uma nova tarefa"
        value={task.description}
        onChange={(e) => handleOnValueChange('description', e.target.value)}
        aria-label="Descrição da tarefa"
      />

      <Select
        name="priority"
        value={task.priority}
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
        className="edit-form__submit-button"
        type="submit"
        disabled={!isFormValid}
        aria-disabled={!isFormValid}
      >
        Atualizar
      </button>
    </form>
  )
}
