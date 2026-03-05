import { Link, NavLink } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { BsCameraReelsFill } from "react-icons/bs";
import '../css/Navbar.css'

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <span>Movie App</span>
                </Link>
                <div className="navbar-menu">
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}
                    >
                        <BsCameraReelsFill className="nav-icon" />
                        <span>Films</span>
                    </NavLink>
                    <NavLink
                        to="/users"
                        className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}
                    >
                        <FaUser className="nav-icon" />
                        <span>Profil</span>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}
