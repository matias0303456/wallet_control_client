import { BrowserRouter } from "react-router-dom"

import { Router } from './components/Router'

function App() {

  return (
    <BrowserRouter>
      <div className="bg-dark text-light vh-100">
        <header className="p-3 pb-1">
          <h1>
            Wallet Control
          </h1>
        </header>
        <main className="p-3 pt-1">
          <Router />
        </main>
        <footer className="position-absolute bottom-0 w-100 text-center pb-2">
          Wallet Control &copy; | {new Date().getFullYear()}
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
