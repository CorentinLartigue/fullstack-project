import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

interface Movie {
    id: number
    title: string
    year : number
    genre: string
    rating: number
}

function App() {
    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
        fetch('http://localhost:5000/api/movies')
            .then(response => response.json())
            .then(data => setMovies(data))
    }, [])

    return (
        <div className="movies-container">
            <h1 className="movies-title">Cinéma</h1>
            <div className="movies-grid">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <Link to={`/movie/${movie.id}`} className="movie-link">
                            {movie.title}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App
