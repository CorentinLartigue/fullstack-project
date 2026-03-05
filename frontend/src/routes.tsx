import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.tsx'
import App from './App'
import MovieDetail from './pages/MovieDetail'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <App /> },
            { path: 'movie/:id', element: <MovieDetail /> },
        ],
    },
])
