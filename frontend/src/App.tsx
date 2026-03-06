import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import movieService from './services/movieService'
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        movieService.getAll()
            .then(response => {
                setMovies(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erreur chargement movies:", err);
                setLoading(false);
            });
    }, [])

    if (loading) return <div className="loading">Chargement des films...</div>;

    return (
        <div className="movies-container">
            <h1 className="movies-title">Catalogue de Films</h1>
            <div className="movies-grid">
                {movies.map((movie) => (
                    <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-link">
                        <div className="movie-card">
                            <div className="movie-rating">{movie.rating}/10</div>
                            <div className="movie-info">
                                <h3>{movie.title}</h3>
                                <p>{movie.year} • {movie.genre}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default App
