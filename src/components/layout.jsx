

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './nav';

const API_KEY = '21212a1e';

function Layout() {
    const defaultMovies = [
    {
        imdbID: 'tt0848228',
        Title: 'The Avengers',
        Year: '2012',
        Poster: 'https://m.media-amazon.com/images/M/MV5BNGE0YTVjNzUtNzJjOS00NGNlLTgxMzctZTY4YTE1Y2Y1ZTU4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg'
    },
    {
        imdbID: 'tt4154796',
        Title: 'Avengers: Endgame',
        Year: '2019',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMWEyNDM2ZmQtMmFkNi00MTQ1LTk1MjItMzdlZGJlYmIyYzZlXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg'
    },
    {
        imdbID: 'tt4154756',
        Title: 'Avengers: Infinity War',
        Year: '2018',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_QL75_UX380_CR0,0,380,562_.jpg'
    },
    {
        imdbID: 'tt2395427',
        Title: 'Avengers: Age of Ultron',
        Year: '2015',
        Poster: 'https://m.media-amazon.com/images/M/MV5BODBhYTg1NGQtNGVmNS00ZTdiLThjYTYtZDFkNzRiNTZmNDZjXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg'
    },
    {
        imdbID: 'tt0118661',
        Title: 'The Avengers',
        Year: '1998',
        Poster: 'https://m.media-amazon.com/images/M/MV5BZTA4ZmZlZWQtZDRlYS00ZWZhLTk0MzEtYjExMGIzMTBlZDNlXkEyXkFqcGc@._V1_SX300.jpg'
    }
];

    const [movies, setMovies] = useState(defaultMovies);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('Marvel');

    async function fetchMovies(search) {
        setLoading(true);
        setSearchTerm(search);

        try {
            const res = await fetch(
                `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(search)}`
            );

            const data = await res.json();

            if (data.Response === 'True') {
                setMovies(data.Search);
            } else {
                setMovies([]);
            }

        } catch (error) {
            console.error('Error fetching movies:', error);
            setMovies([]);

        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Nav onSearch={fetchMovies} />

            <main>
                <Outlet
                    context={{
                        movies,
                        loading,
                        searchTerm
                    }}
                />
            </main>

            <footer>
                <p>Created by Simplified.org. Powered by OMDb API.</p>
            </footer>
        </>
    );
}

export default Layout;

