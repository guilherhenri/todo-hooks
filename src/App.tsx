import '@styles/layouts/_content.scss'

import { Banner } from './components/banner'
import { CreateForm } from './components/create-form'
import { Header } from './components/header'

function App() {
  return (
    <main>
      <Banner />

      <div className="content">
        <CreateForm />

        <div className="content__tasks">
          <Header />
        </div>
      </div>
    </main>
  )
}

export default App
