import '@styles/components/_header.scss'

export function Header() {
  return (
    <header className="header">
      <div className="header__status">
        <span className="header__created">
          Tarefas Criadas <span className="header__status-tip">5</span>
        </span>
        <span className="header__done">
          Concluídas <span className="header__status-tip">2 de 5</span>
        </span>
      </div>
    </header>
  )
}
