import { Routes, Route, Navigate } from 'react-router-dom'
import ToyIndex from './pages/ToyIndex.jsx'
import ToyDetails from './pages/ToyDetails.jsx'
import ToyEdit  from './pages/ToyEdit.jsx'
import Dashboard  from './pages/Dashboard.jsx'
import ReviewExplore from './pages/ReviewExplore.jsx'
import UserDetails from './pages/UserDetails.jsx'
import About from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import Header from './components/Header.jsx'
import Login from './pages/Login.jsx'
import { userService } from './services/userService.js'
import './assets/base.css'
import './assets/components.css'
import './assets/layout.css'
import './assets/media.css'
import './assets/pages.css'

function App() {
  const user = userService.getLoggedInUser()

  // Simple helpers defined inside App
  function requireAuth(element) {
    return user ? element : <Navigate to="/login" replace />
  }

  function requireAdmin(element) {
    return user?.isAdmin ? element : <Navigate to="/login" replace />
  }

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/toy" element={<ToyIndex />} />
        <Route path="/toy/:toyId" element={<ToyDetails />} />

        {/* admin requirements*/}
        <Route path="/toy/edit" element={requireAdmin(<ToyEdit />)} />
        <Route path="/toy/edit/:toyId" element={requireAdmin(<ToyEdit />)} />
        <Route path="/dashboard" element={requireAuth(<Dashboard />)} />
        <Route path="/review" element={<ReviewExplore />} />
        <Route path="/user/:userId" element={<UserDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </main>
  )
}

export default App
