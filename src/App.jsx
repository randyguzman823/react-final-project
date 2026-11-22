

import { HashRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/layout';
import Home from './pages/home';
import MovieDetails from './pages/moviedetails';

function NotFound() {
    return (
        <div className="not-found">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you're looking for doesn't exist.</p>
            <a href="/">Return to Home</a>
        </div>
    );
}

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Home Page */}
                    <Route index element={<Home />} />

                    {/* Individual Movie Details */}
                    <Route path="movie/:id" element={<MovieDetails />} />

                    {/* Invalid Pages */}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default App;

