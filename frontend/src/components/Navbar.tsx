import { Link, NavLink } from 'react-router-dom'
import '../css/Navbar.css'

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                Movie App
            </Link>
            <NavLink
                to="/"
                className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}
            >
                Accueil
            </NavLink>
        </nav>
    )
}
