import { Link, NavLink } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { BsCameraReelsFill } from "react-icons/bs";
import '../css/Navbar.css'

interface NavbarProps {
    count: number;
}

export default function Navbar({ count }: NavbarProps) {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <span>Application Fullstack</span>
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
                        <span>Users ({count})</span>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}
