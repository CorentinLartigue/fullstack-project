import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../css/MovieDetail.css'

interface Movie {
    id: number
    title: string
    year: number
    genre: string
    rating: number
}

function MovieDetail() {
    const { id } = useParams<{ id: string }>()
    const [movie, setMovie] = useState<Movie | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:5000/api/movies/${id}`)
            .then((response) => {
                if (!response.ok) throw new Error('Movie not found')
                return response.json()
            })
            .then((data) => {
                setMovie(data)
                setLoading(false)
            })
            .catch(() => {
                setMovie(null)
                setLoading(false)
            })
    }, [id])

    if (loading) return <div className="loading">Chargement...</div>
    if (!movie) return <div className="error">Film non trouve</div>

    return (
        <div className="movie-detail">
            <div className="movie-detail-header">
                <Link to="/" className="back-link">← Retour a la liste</Link>
            </div>
            <h1 className="movie-detail-title">{movie.title}</h1>
            <div className="movie-details">
                <div className="movie-detail-item">
                    <span className="movie-detail-label">Année</span>
                    <span className="movie-detail-value">{movie.year}</span>
                </div>
                <div className="movie-detail-item">
                    <span className="movie-detail-label">Genre</span>
                    <span className="movie-detail-value">{movie.genre}</span>
                </div>
                <div className="movie-detail-item">
                    <span className="movie-detail-label">Note IMDb</span>
                    <span className="movie-detail-rating">⭐ {movie.rating}/10</span>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail
