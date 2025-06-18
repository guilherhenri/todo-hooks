import '@styles/components/_list-tasks.scss'

import { ClipboardTextIcon } from '@phosphor-icons/react'

import { TaskCard } from './task-card'

export function ListTasks() {
  return (
    <div className="list">
      <div className="list__content">
        <TaskCard />
      </div>

      <div className="list__empty">
        <ClipboardTextIcon size={56} />
        <span>
          <strong>Você ainda não tem tarefas cadastradas</strong> <br />
          Crie tarefas e organize seus itens a fazer
        </span>
      </div>
    </div>
  )
}
