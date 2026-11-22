
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import MovieCard from '../components/moviecard';

function Home() {
    const { movies, loading, searchTerm } = useOutletContext();

    const [sortType, setSortType] = useState('default');

    // Create a copy so we don't change the original movie array
    const sortedMovies = [...movies];

    if (sortType === 'a-z') {
        sortedMovies.sort((a, b) =>
            a.Title.localeCompare(b.Title)
        );
    } else if (sortType === 'z-a') {
        sortedMovies.sort((a, b) =>
            b.Title.localeCompare(a.Title)
        );
    } else if (sortType === 'newest') {
        sortedMovies.sort((a, b) =>
            parseInt(b.Year, 10) - parseInt(a.Year, 10)
        );
    } else if (sortType === 'oldest') {
        sortedMovies.sort((a, b) =>
            parseInt(a.Year, 10) - parseInt(b.Year, 10)
        );
    }

    return (
        <>
            <div className="controls">
                <p className="resultsInfo">
                    Showing: {searchTerm}
                </p>

                <div>
                    <label htmlFor="sortSelect">Sort:</label>

                    <select
                        id="sortSelect"
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                    >
                        <option value="default">Default</option>
                        <option value="a-z">A - Z</option>
                        <option value="z-a">Z - A</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
            </div>

            {loading && (
                <div className="spinner"></div>
            )}

            <div className="movies-grid">
                {loading ? (
                    Array(10).fill(0).map((_, index) => (
                        <div
                            className="movie-card movie-card--skeleton"
                            key={index}
                        >
                            <div className="movie-card__img movie-card__img--skeleton"></div>
                            <div className="movie-card__title movie-card__title--skeleton"></div>
                            <div className="movie-card__year movie-card__year--skeleton"></div>
                        </div>
                    ))
                ) : (
                    sortedMovies.map((movie) => (
                        <MovieCard
                            key={movie.imdbID}
                            movie={movie}
                        />
                    ))
                )}
            </div>

            {!loading && searchTerm && movies.length === 0 && (
    <p>No movies found. Try searching for something!</p>
            )}
        </>
    );
}

export default Home;
