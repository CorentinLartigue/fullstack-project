import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './App.css'

interface Movie {
    id: number
    title: string
    year: number
    genre: string
    rating: number
}

function App() {
    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
        const apiUrl = import.meta.env.BACKEND_URL || 'http://localhost:3001'
        fetch(`${apiUrl}/api/movies`)
            .then(response => response.json())
            .then(data => setMovies(data))
    }, [])

    return (
        <div className="movies-container">
            <div className="movies-grid">
                {movies.map((movie) => (
                    <Link to={`/movies/${movie.id}`} className="movie-link">
                        <div key={movie.id} className="movie-card">
                            {movie.title}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default App
