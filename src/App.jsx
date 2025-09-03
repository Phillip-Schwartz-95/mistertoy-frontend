import { Routes, Route, Navigate } from 'react-router-dom'
import ToyIndex from './pages/ToyIndex.jsx'
import ToyDetails from './pages/ToyDetails.jsx'
import ToyEdit  from './pages/ToyEdit.jsx'
import Dashboard  from './pages/Dashboard.jsx'
import About from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import Header from './components/Header.jsx'
import './assets/base.css'
import './assets/components.css'
import './assets/layout.css'
import './assets/media.css'
import './assets/pages.css'

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/toy" element={<ToyIndex />} />
        <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
        <Route path="/toy/edit" element={<ToyEdit />} />
        <Route path="/toy/:toyId" element={<ToyDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </main>
  )
}

export default App
