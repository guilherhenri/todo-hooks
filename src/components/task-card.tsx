import '@styles/components/_task-card.scss'

import { PencilIcon, TrashIcon } from '@phosphor-icons/react'
import { useState } from 'react'

import { type Task, useTask } from '@/contexts/task-context'

import { EditForm } from './edit-form'
import { Checkbox } from './ui/checkbox'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'

export function TaskCard({
  task: { id, description, priority, isDone },
}: {
  task: Task
}) {
  const { updateTask, deleteTask } = useTask()

  const [open, setOpen] = useState(false)

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
    <div className="card" role="listitem">
      <div className="card__done">
        <Checkbox
          variant="circle"
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
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              className="card__actions-button card__actions-edit"
              aria-label="Editar tarefa"
            >
              <PencilIcon size={18} />
            </button>
          </DialogTrigger>
          <DialogContent aria-describedby={undefined}>
            <DialogTitle>Editar tarefa</DialogTitle>

            <EditForm id={id} closeDialog={() => setOpen(false)} />
          </DialogContent>
        </Dialog>

        <span className="card__actions-separator" />

        <button
          className="card__actions-button card__actions-delete"
          onClick={() => deleteTask(id)}
          aria-label="Apagar tarefa"
        >
          <TrashIcon size={18} />
        </button>
      </div>
    </div>
  )
}
