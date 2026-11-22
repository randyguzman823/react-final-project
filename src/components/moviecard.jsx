
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie }) {
    const navigate = useNavigate();

    const poster = movie.Poster !== 'N/A' ? movie.Poster : '';

    return (
        <div
            className="movie-card"
            onClick={() => navigate(`/movie/${movie.imdbID}`)}
        >
            {poster ? (
                <img
                    className="movie-card__img"
                    src={poster}
                    alt={movie.Title}
                />
            ) : (
                <div className="movie-card__poster-placeholder">
                    Movie Poster
                    <br />
                    Not Available
                </div>
            )}

            <h2 className="movie-card__title">
                {movie.Title}
            </h2>

            <p className="movie-card__year">
                {movie.Year}
            </p>
        </div>
    );
}

export default MovieCard;
