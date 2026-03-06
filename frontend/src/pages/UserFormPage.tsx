import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import userService from '../services/userService';
import UserForm from '../components/UserForm';

function UserFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(id ? true : false);
  const [error, setError] = useState<string | null>(null);

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      const fetchUser = async () => {
        try {
          const response = await userService.getById(id);
          const data = response.data;
          const userData = (data as any).data || data;
          setInitialData({
            name: userData.name,
            email: userData.email,
            role: userData.role
          });
        } catch (err) {
          console.error("Erreur lors de la récupération de l'utilisateur:", err);
          setError("Impossible de charger les données de l'utilisateur.");
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (formData: any) => {
    try {
      if (isEditMode && id) {
        await userService.update(id, formData);
      } else {
        await userService.create(formData);
      }
      navigate('/users');
    } catch (err) {
      console.error("Erreur lors de la soumission du formulaire:", err);
      throw err;
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return (
    <div className="container" style={{ textAlign: 'center', padding: '40px' }}>
      <div className="error">{error}</div>
      <Link to="/users" className="back-link" style={{ marginTop: '20px', display: 'inline-flex' }}>
        <FaArrowLeft style={{ marginRight: '8px' }} /> Retour à la liste
      </Link>
    </div>
  );

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link to="/users" className="back-link" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', color: '#667eea', fontWeight: '600' }}>
          <FaArrowLeft style={{ marginRight: '8px' }} /> Retour à la liste
        </Link>
      </div>
      
      <h1 style={{ color: '#2d3748', marginBottom: '24px' }}>
        {isEditMode ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
      </h1>

      <UserForm 
        onSubmit={handleSubmit} 
        initialData={initialData} 
        submitLabel={isEditMode ? "Mettre à jour" : "Créer l'utilisateur"}
      />
    </div>
  );
}

export default UserFormPage;
