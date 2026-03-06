import {FaTrash, FaEdit, FaUser, FaEnvelope, FaIdBadge, FaCalendarAlt} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import type {User} from '../services/userService';
import '../css/UserCard.css';

interface UserCardProps {
    user: User,
    onDelete: (id: string) => void,
    key?: string
}

const UserCard = ({user, onDelete, key}: UserCardProps) => {
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Date inconnue';
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="user-card">
            <div className="user-card-header">
                <Link to={`/users/${user.id}`} className="user-avatar-link">
                    <div className="user-avatar">
                        <FaUser/>
                    </div>
                </Link>
                <div className="user-info">
                    <Link to={`/users/${user.id}`} className="user-name-link">
                        <h3>{user.name}</h3>
                    </Link>
                    <span className={`role-badge ${user.role}`}>
            <FaIdBadge/> {user.role}
          </span>
                </div>
            </div>

            <div className="user-card-body">
                <div className="info-item">
                    <FaEnvelope className="info-icon"/>
                    <span>{user.email}</span>
                </div>
                <div className="info-item">
                    <FaCalendarAlt className="info-icon"/>
                    <span>Créé le : {formatDate(user.createdAt)}</span>
                </div>
            </div>

            <div className="user-card-footer">
                <Link to={`/users/edit/${user.id}`} className="btn-edit">
                    <FaEdit/> Modifier
                </Link>
                <button
                    className="btn-delete"
                    onClick={() => onDelete(user.id)}
                    aria-label="Supprimer l'utilisateur"
                >
                    <FaTrash/> Supprimer
                </button>
            </div>
        </div>
    );
};

export default UserCard;
