import { useState, FormEvent, useEffect } from 'react';
import { FaSave, FaPlusCircle, FaUser, FaEnvelope, FaShieldAlt } from 'react-icons/fa';
import '../css/UserForm.css';

interface FormData {
  name: string;
  email: string;
  role: string;
}

interface UserFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  initialData?: FormData;
  submitLabel?: string;
}

const UserForm = ({ onSubmit, initialData, submitLabel }: UserFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    role: 'user'
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Une erreur est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="name">
            <FaUser className="input-icon" /> Nom
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: John Doe"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">
            <FaEnvelope className="input-icon" /> Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">
            <FaShieldAlt className="input-icon" /> Rôle
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>

        {error && <div className="form-error">{error}</div>}

        <button type="submit" className="btn-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Opération en cours...' : (
            <>
              {initialData ? <FaSave /> : <FaPlusCircle />}
              {' '}
              {submitLabel || (initialData ? 'Mettre à jour' : "Créer l'utilisateur")}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
