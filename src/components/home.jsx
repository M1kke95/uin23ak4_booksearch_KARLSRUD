import { useState, useEffect } from "react";
import SearchResults from "./SearchResults";

export default function Home({ setQuery }) {
    const [staticBooks, setStaticBooks] = useState([]);

    useEffect(() => {
        const fetchStaticBooks = async () => {
            try {
                const response = await fetch(`https://openlibrary.org/search.json?q=james+bond`);
                const data = await response.json();
                setStaticBooks(data.docs.filter(book => book.title.toLowerCase().includes("james bond")));
            } catch (error) {
                console.error('Error fetching book list:', error);
            }
        };
        fetchStaticBooks();
    }, []);

    return <SearchResults setQuery={setQuery} staticBooks={staticBooks} />;
}
