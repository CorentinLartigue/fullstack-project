import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaArrowLeft, FaEnvelope, FaIdBadge, FaCalendarAlt } from 'react-icons/fa'
import userService from '../services/userService'
import type { User } from '../services/userService'

function UserDetail() {
    const { id } = useParams<{ id: string }>()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return;
        
        userService.getById(id)
            .then((response) => {
                const data = response.data;
                const userData: User = (data as any).data || data;
                setUser(userData);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erreur lors de la récupération de l'utilisateur:", err);
                setUser(null);
                setLoading(false);
            });
    }, [id])

    if (loading) return <div className="loading">Chargement de l'utilisateur...</div>
    if (!user) return <div className="error">Utilisateur non trouvé</div>

    return (
        <div className="movie-detail">
            <div className="movie-detail-header">
                <Link to="/users" className="back-link">
                    <FaArrowLeft style={{marginRight: '8px'}} />
                    Retour à la liste
                </Link>
            </div>
            <h1 className="movie-detail-title">{user.name}</h1>
            <div className="movie-details">
                <div className="movie-detail-item">
                    <FaIdBadge className="icon" />
                    <div>
                        <span className="movie-detail-label">Rôle</span>
                        <span className="movie-detail-value">{user.role}</span>
                    </div>
                </div>
                <div className="movie-detail-item">
                    <FaEnvelope className="icon" />
                    <div>
                        <span className="movie-detail-label">Email</span>
                        <span className="movie-detail-value">{user.email}</span>
                    </div>
                </div>
                <div className="movie-detail-item">
                    <FaCalendarAlt className="icon" />
                    <div>
                        <span className="movie-detail-label">Date de création</span>
                        <span className="movie-detail-value">{user.createdAt}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetail
