import { Link, NavLink } from 'react-router-dom'
import i18n from '../services/i18n.js'
import { useTranslation } from 'react-i18next'

export default function Header() {
    const { t } = useTranslation()

    function handleChange(ev) {
        const lang = ev.target.value
        i18n.changeLanguage(lang)
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
                <select onChange={handleChange} value={i18n.language}>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="es">Español</option>
                </select>
            </div>

        </header>
    )
}

