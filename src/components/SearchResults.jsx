import { useState, useEffect } from "react";
import Book from "./BookCard";

export default function SearchResults({ setQuery, staticBooks }) {
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setQuery(search);
    }
    
    useEffect(() => {
        if (search.length >= 3) {
            const fetchResults = async () => {
                try {
                    const formattedSearch = search.replace(" ", '+');
                    const response = await fetch(`https://openlibrary.org/search.json?title=${formattedSearch}`);
                    const data = await response.json();
                    setResults(data.docs);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            };
            fetchResults();
        } else {
            
            setResults(staticBooks);
        }
    }, [search, staticBooks]);

    return (
        <>
            <section>
            <h2>Find your favorite book</h2>
            <form onSubmit={handleSubmit}>
                <input id="searchInput" className="searchBar" type="text" placeholder="Enter book title..." value={search} onChange={(e) => setSearch(e.target.value)}/> 
                <button type="submit">Search</button>
            </form>
            <ul className="search-results">
                {results && results
                .sort((a, b) => (b.ratings_average || 0) - (a.ratings_average || 0)).map((result, index) => ( 
                    <Book key={index} book={result} />
                ))}
            </ul>
        </section>
        </>
    );
}
