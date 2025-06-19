import '@styles/layouts/_content.scss'

import { Banner } from './components/banner'
import { CreateForm } from './components/create-form'
import { Header } from './components/header'
import { ListTasks } from './components/list-tasks'
import { TaskProvider } from './contexts/task-context'

function App() {
  return (
    <TaskProvider>
      <main>
        <Banner />

        <div className="content">
          <CreateForm />

          <div className="content__tasks">
            <Header />

            <ListTasks />
          </div>
        </div>
      </main>
    </TaskProvider>
  )
}

export default App
