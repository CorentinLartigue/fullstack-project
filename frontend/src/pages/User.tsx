import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {FaUser, FaIdBadge} from 'react-icons/fa'

interface User {
    id: number
    name: string
    email: string
    role: string
    createdAt: string
}

function User() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const apiUrl = import.meta.env.BACKEND_URL || 'http://localhost:3001'
        fetch(`${apiUrl}/api/users`)
            .then(response => response.json())
            .then(res => {
                if (res.success && Array.isArray(res.data)) {
                    setUsers(res.data)
                } else if (Array.isArray(res)) {
                    setUsers(res)
                }
                setLoading(false)
            })
            .catch(err => {
                console.error("Erreur chargement users:", err)
                setLoading(false)
            })
    }, [])

    if (loading) return <div className="loading">Chargement des utilisateurs...</div>

    return (
        <div className="movies-container">
            <h1 className="movies-title">Utilisateurs</h1>
            <div className="movies-grid">
                {users.map((user) => (
                    <div key={user.id} className="movie-card">
                        <Link to={`/users/${user.id}`} className="movie-link">
                            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <FaUser />
                                <span>{user.name}</span>
                            </div>
                            <div style={{fontSize: '0.8em', color: '#666', marginTop: '5px'}}>
                                <FaIdBadge style={{marginRight: '5px'}}/>
                                {user.role}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default User
