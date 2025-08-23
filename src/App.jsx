import { Routes, Route, Navigate } from 'react-router-dom'
import ToyIndex from './pages/ToyIndex.jsx'
import ToyDetails from './pages/ToyDetails.jsx'

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Navigate to="/toy" />} />
        <Route path="/toy" element={<ToyIndex />} />
        <Route path="/toy/:toyId" element={<ToyDetails />} />
      </Routes>
    </main>
  )
}

export default App

