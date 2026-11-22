
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_KEY = '21212a1e';

function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchMovieDetails() {
            setLoading(true);
            setError('');

            try {
                const res = await fetch(
                    `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
                );

                const data = await res.json();

                if (data.Response === 'True') {
                    setMovie(data);
                } else {
                    setError('Movie details could not be found.');
                }

            } catch (error) {
                console.error(error);
                setError('Something went wrong. Please try again.');
            } finally {
                setLoading(false);
            }
        }

        fetchMovieDetails();
    }, [id]);

    if (loading) {
        return <div className="spinner"></div>;
    }

    if (error) {
        return (
            <div>
                <p>{error}</p>
                <button onClick={() => navigate(-1)}>
                    Go Back
                </button>
            </div>
        );
    }

    if (!movie) {
        return null;
    }

    return (
        <div className="movie-details">
            <button onClick={() => navigate(-1)}>
                ← Back to Movies
            </button>

            <div className="movie-details__content">
                <img
                    className="movie-details__poster"
                    src={movie.Poster !== 'N/A' ? movie.Poster : ''}
                    alt={movie.Title}
                />

                <div className="movie-details__info">
                    <h1>{movie.Title}</h1>

                    <p><strong>Year:</strong> {movie.Year}</p>
                    <p><strong>Rated:</strong> {movie.Rated}</p>
                    <p><strong>Released:</strong> {movie.Released}</p>
                    <p><strong>Runtime:</strong> {movie.Runtime}</p>
                    <p><strong>Genre:</strong> {movie.Genre}</p>
                    <p><strong>Director:</strong> {movie.Director}</p>
                    <p><strong>Actors:</strong> {movie.Actors}</p>
                    <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
                    <p><strong>Awards:</strong> {movie.Awards}</p>

                    <h3>Plot</h3>
                    <p>{movie.Plot}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
