
import { useState } from 'react';
import logo from '../assets/fes-logo.png';

function Nav({ onSearch }) {
    const [searchInput, setSearchInput] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        const searchTerm = searchInput.trim();

        if (searchTerm) {
            onSearch(searchTerm);
        }
    }

    return (
        <nav>
            <div className="logo">
                <img
                    src={logo}
                    alt="Simplified Flix logo"
                    className="logo__img"
                />

                <div className="logo__title">
                    <span>Simplified</span> Flix
                </div>
            </div>

            <form className="search-form" onSubmit={handleSubmit}>
                <div className="search-form__group">
                    <input
                        className="search-form__input"
                        type="text"
                        placeholder="Search movies..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        required
                    />

                    <button
                        className="search-form__button"
                        type="submit"
                        aria-label="Search"
                    >
                        <svg
                            className="search-form__icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="7"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                </div>
            </form>
        </nav>
    );
}

export default Nav;
