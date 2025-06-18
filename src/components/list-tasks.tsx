import '@styles/components/_list-tasks.scss'

import { ClipboardTextIcon } from '@phosphor-icons/react'

import { useTask } from '@/contexts/task-context'

import { TaskCard } from './task-card'

export function ListTasks() {
  const { tasks } = useTask()

  return (
    <div className="list">
      {tasks.length > 0 ? (
        <div className="list__content">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="list__empty">
          <ClipboardTextIcon size={56} />
          <span>
            <strong>Você ainda não tem tarefas cadastradas</strong> <br />
            Crie tarefas e organize seus itens a fazer
          </span>
        </div>
      )}
    </div>
  )
}
