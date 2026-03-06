import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../css/MovieDetail.css'
import { FaArrowLeft, FaCalendarAlt, FaFilm, FaStar } from 'react-icons/fa'
import movieService from '../services/movieService'

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
        if (!id) return;

        movieService.getById(id)
            .then((response) => {
                setMovie(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erreur lors de la récupération du film:", err);
                setMovie(null);
                setLoading(false);
            });
    }, [id])

    if (loading) return <div className="loading">Chargement...</div>
    if (!movie) return <div className="error">Film non trouvé</div>

    return (
        <div className="movie-detail">
            <div className="movie-detail-header">
                <Link to="/" className="back-link">
                    <FaArrowLeft style={{marginRight: '8px'}} aria-hidden/>
                    Retour à la liste
                </Link>
            </div>
            <h1 className="movie-detail-title">{movie.title}</h1>
            <div className="movie-details">
                <div className="movie-detail-item">
                    <FaCalendarAlt className="icon" aria-hidden/>
                    <div>
                        <span className="movie-detail-label">Année</span>
                        <span className="movie-detail-value">{movie.year}</span>
                    </div>
                </div>
                <div className="movie-detail-item">
                    <FaFilm className="icon" aria-hidden/>
                    <div>
                        <span className="movie-detail-label">Genre</span>
                        <span className="movie-detail-value">{movie.genre}</span>
                    </div>
                </div>
                <div className="movie-detail-item">
                    <FaStar className="icon" aria-hidden/>
                    <div>
                        <span className="movie-detail-label">Note</span>
                        <span className="movie-detail-rating">{movie.rating}/10</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail
