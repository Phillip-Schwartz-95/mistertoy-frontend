import { Link, NavLink, useNavigate } from 'react-router-dom'
import i18n from '../services/i18n.js'
import { useTranslation } from 'react-i18next'
import { userService } from '../services/userService.js'

export default function Header() {
    const { t } = useTranslation()
    const user = userService.getLoggedInUser()
    const navigate = useNavigate()

    function handleChange(ev) {
        const lang = ev.target.value
        i18n.changeLanguage(lang)
    }

    async function onLogout() {
        try {
            await userService.logout()
            navigate('/') // back to home
        } catch (err) {
            console.error('Logout failed', err)
        }
    }

    return (
        <header className="main-header">

            <div className="header-left">
                <Link to="/" className="logo">MisterToy</Link>
            </div>

            <div className="header-right">
                <nav>
                    <NavLink to="/toy">Toys</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/about">About</NavLink>
                </nav>
                <div className="user-status">
                    {user ? (
                        <>
                            <span>Signed in as: {user.fullname} {user.isAdmin && '(Admin)'}</span>
                            <button onClick={onLogout}>Logout</button>
                        </>
                    ) : (
                        <span>Not signed in</span>
                    )}
                </div>
                <select onChange={handleChange} value={i18n.language}>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="es">Español</option>
                </select>
            </div>

        </header>
    )
}

