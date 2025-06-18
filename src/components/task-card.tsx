import '@styles/components/_task-card.scss'

import { PencilIcon, TrashIcon } from '@phosphor-icons/react'

import { type Task, useTask } from '@/contexts/task-context'

import { Checkbox } from './ui/checkbox'

export function TaskCard({
  task: { id, description, priority, isDone },
}: {
  task: Task
}) {
  const { updateTask, deleteTask } = useTask()

  function translatePriory(priority: Task['priority']) {
    switch (priority) {
      case 'high':
        return 'Alta'
      case 'regular':
        return 'Normal'
      case 'low':
        return 'Baixa'
    }
  }

  function handleToggleTask(state: boolean) {
    updateTask({
      id,
      description,
      priority,
      isDone: state,
    })
  }

  return (
    <div className="card">
      <div className="card__done">
        <Checkbox
          defaultChecked={isDone}
          onCheckedChange={(checked) => handleToggleTask(Boolean(checked))}
        />
      </div>

      <div className="card__info">
        <p className="card__info-description" data-done={isDone}>
          {description}
        </p>
        <span
          className="card__info-priority"
          data-done={isDone}
          data-priority={priority}
        >
          {translatePriory(priority)}
        </span>
      </div>

      <div className="card__actions">
        <button className="card__actions-button card__actions-edit">
          <PencilIcon size={18} />
        </button>

        <span className="card__actions-separator" />

        <button
          className="card__actions-button card__actions-delete"
          onClick={() => deleteTask(id)}
        >
          <TrashIcon size={18} />
        </button>
      </div>
    </div>
  )
}
