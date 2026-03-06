import axios from 'axios';

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt?: string;
}

const api = axios.create({
  baseURL: '/api',
});

const userService = {
  getAll: () => api.get<User[]>('/users'),
  getById: (id: string | number) => api.get<User>(`/users/${id}`),
  create: (data: Partial<User>) => api.post<User>('/users', data),
  update: (id: string | number, data: Partial<User>) => api.put<User>(`/users/${id}`, data),
  remove: (id: string | number) => api.delete(`/users/${id}`),
};

export default userService;
