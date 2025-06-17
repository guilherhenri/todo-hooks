import '@styles/layouts/_content.scss'

import { Banner } from './components/banner'
import { CreateForm } from './components/create-form'

function App() {
  return (
    <main>
      <Banner />

      <div className="content">
        <CreateForm />
      </div>
    </main>
  )
}

export default App
