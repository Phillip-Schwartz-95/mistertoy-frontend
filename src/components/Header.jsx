import { Link, NavLink } from 'react-router-dom'

export function Header() {
  return (
    <header className="main-header" style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '20px', fontWeight: 'bold', fontSize: '1.2em' }}>MisterToy</Link>
      <NavLink to="/toy" style={{ marginRight: '10px' }}>Toys</NavLink>
      <NavLink to="/dashboard" style={{ marginRight: '10px' }}>Dashboard</NavLink>
      <NavLink to="/about">About</NavLink>
    </header>
  )
}

