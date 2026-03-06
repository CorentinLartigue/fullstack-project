import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.tsx'
import App from './App'
import MovieDetail from './pages/MovieDetail'
import User from './pages/User'
import UserDetail from './pages/UserDetail'
import UserFormPage from './pages/UserFormPage'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <App /> },
            { path: 'movies/:id', element: <MovieDetail /> },
            { path: 'users', element: <User /> },
            { path: 'users/new', element: <UserFormPage /> },
            { path: 'users/edit/:id', element: <UserFormPage /> },
            { path: 'users/:id', element: <UserDetail /> }
        ],
    },
])
