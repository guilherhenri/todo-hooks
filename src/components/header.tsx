import '@styles/components/_header.scss'

import { useTask } from '@/contexts/task-context'

import { Filters } from './filters'

export function Header() {
  const { meta } = useTask()

  return (
    <header className="header">
      <div className="header__status">
        <span className="header__created">
          Tarefas Criadas{' '}
          <span className="header__status-tip">{meta.total}</span>
        </span>
        <span className="header__done">
          Concluídas{' '}
          <span className="header__status-tip">
            {meta.done} de {meta.total}
          </span>
        </span>
      </div>

      <Filters />
    </header>
  )
}
