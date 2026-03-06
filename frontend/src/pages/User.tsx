import { useEffect, useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import userService from '../services/userService';
import type { User } from '../services/userService';
import UserList from '../components/UserList';

interface ContextType {
  setUsersCount: (count: number) => void;
}

function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setUsersCount } = useOutletContext<ContextType>();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setUsersCount(users.length);
  }, [users, setUsersCount]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();
      const data = response.data;
      const userList: User[] = (data as any).data || data;
      if (Array.isArray(userList)) {
        setUsers(userList);
      }
      setError(null);
    } catch (err: any) {
      setError('Erreur lors du chargement des utilisateurs.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await userService.remove(id);
        setUsers(prev => prev.filter(user => user.id !== id));
      } catch (err) {
        alert('Erreur lors de la suppression.');
      }
    }
  };

  return (
    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Link
          to="/users/new" 
          className="btn-submit" 
          style={{ textDecoration: 'none', padding: '10px 20px', marginTop: 0 }}
        >
          <FaPlus /> Ajouter un utilisateur
        </Link>
      </div>
      
      <UserList 
        users={users} 
        loading={loading} 
        error={error} 
        onDelete={handleDelete} 
      />
    </div>
  );
}

export default UserPage;
