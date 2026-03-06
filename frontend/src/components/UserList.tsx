import UserCard from './UserCard';
import type { User } from '../services/userService';
import '../css/UserList.css';

interface UserListProps {
  users: User[];
  loading: boolean;
  error: string | null;
  onDelete: (id: string) => void;
}

const UserList = ({ users, loading, error, onDelete }: UserListProps) => {
  if (loading) {
    return <div className="user-list-status">Chargement des utilisateurs...</div>;
  }

  if (error) {
    return <div className="user-list-status error">{error}</div>;
  }

  if (users.length === 0) {
    return <div className="user-list-status">Aucun utilisateur trouvé.</div>;
  }

  return (
    <div className="user-list-grid">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default UserList;
