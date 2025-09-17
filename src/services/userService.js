import { httpService } from './httpService.js'

const AUTH_API = 'auth/'

export const userService = {
  login,
  logout,
  getLoggedInUser,
}

async function login(credentials) {
  try {
    const user = await httpService.post(AUTH_API + 'login', credentials)
    sessionStorage.setItem('loggedInUser', JSON.stringify(user))
    return user
  } catch (err) {
    console.error('Login failed:', err)
    throw err
  }
}

async function logout() {
  try {
    await httpService.post(AUTH_API + 'logout')
    sessionStorage.removeItem('loggedInUser')
  } catch (err) {
    console.error('Logout failed:', err)
    throw err
  }
}

function getLoggedInUser() {
  const user = sessionStorage.getItem('loggedInUser')
  return user ? JSON.parse(user) : null
}
