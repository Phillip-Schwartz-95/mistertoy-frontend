import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userService } from '../services/userService.js'

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  function handleChange(ev) {
    const { name, value } = ev.target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }

  async function onLogin(ev) {
    ev.preventDefault()
    try {
      await userService.login(credentials)
      navigate('/toy') // redirect to toys after login
    } catch {
      setError('Invalid username or password')
    }
  }

  return (
    <section className="login-page">
      <h2>Login</h2>
      <form onSubmit={onLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </section>
  )
}
