import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

const movieService = {
  getAll: () => api.get('/movies'),
  getById: (id: string | number) => api.get(`/movies/${id}`),
};

export default movieService;
