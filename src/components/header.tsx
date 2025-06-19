import '@styles/components/_header.scss'

import { useMemo } from 'react'

import { useTask } from '@/contexts/task-context'

export function Header() {
  const { tasks } = useTask()

  const doneTasks = useMemo(() => {
    return tasks.filter((task) => task.isDone).length
  }, [tasks])

  return (
    <header className="header">
      <div className="header__status">
        <span className="header__created">
          Tarefas Criadas{' '}
          <span className="header__status-tip">{tasks.length}</span>
        </span>
        <span className="header__done">
          Concluídas{' '}
          <span className="header__status-tip">
            {doneTasks} de {tasks.length}
          </span>
        </span>
      </div>
    </header>
  )
}
