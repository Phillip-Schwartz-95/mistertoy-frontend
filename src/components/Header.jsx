import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="main-header">
      <div className="header-left">
        <Link to="/" className="logo">MisterToy</Link>
      </div>
      <nav className="header-right">
        <NavLink to="/toy">Toys</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  )
}

