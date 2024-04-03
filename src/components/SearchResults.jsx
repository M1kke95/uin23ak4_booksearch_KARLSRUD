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
            <p>Find your favorite book</p>
            <form onSubmit={handleSubmit}>
                <input className="searchBar" type="text" placeholder="Search for a book..." value={search} onChange={(e) => setSearch(e.target.value)}/> 
                <button type="submit">Search</button>
            </form>
            <nav>
                <ul className="search-results">
                    {results && results
                    .sort((a, b) => (b.ratings_average || 0) - (a.ratings_average || 0)).map((result, index) => ( 
                    //brukte denne siden for å finne undefined ratings https://codedamn.com/news/javascript/check-if-undefined-null
                    <Book key={index} book={result} />
                    ))}
                </ul>
            </nav>
        </>
    );
}
