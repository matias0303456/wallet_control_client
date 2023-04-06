import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import { Router } from './components/Router'
import './app.css'

function App() {

  return (
    <BrowserRouter>
      <div className="bg-dark text-light mainContainer">
        <header className="p-3 pb-1">
          <h1>
            Wallet Control
          </h1>
        </header>
        <main className="p-3 pt-1">
          <Router />
        </main>
        <footer className="w-100 text-center pb-2">
          Wallet Control &copy; | {new Date().getFullYear()}
        </footer>
      </div>
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  )
}

export default App
