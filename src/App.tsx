import '@styles/layouts/_content.scss'

import { Banner } from './components/banner'
import { CreateForm } from './components/create-form'
import { Header } from './components/header'
import { ListTasks } from './components/list-tasks'

function App() {
  return (
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
  )
}

export default App
