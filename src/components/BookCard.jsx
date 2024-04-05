import { useState } from "react"

export default function Book({book}){
    const [books, setBooks] = useState([])

    return(
        <>
      <li>
            <h2>title:</h2>
            <p>{book?.title}</p>
            {book.cover_i ? (
                <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} alt={book.title} />
                ) : (
                <>
                <div className="fallback_photo"><span>No Cover Available</span></div>
                </>
            )}
            <h2>author: </h2>
            <p>{book?.author_name}</p>
            <h2>rating:</h2>
            <p>{book.ratings_average ? book.ratings_average.toFixed(1): "No rating"}</p>
            <h2>first published: </h2>
            <p>{book.first_publish_year}</p>
            <h2>Amazon link:</h2>
            {book.id_amazon && book.id_amazon[0] ?(
                <a href={`https://www.amazon.com/s?k=${book.id_amazon[0]}`}>Amazon</a>
            ) : (
                <p>No Link available</p>
            )}
        </li>
        </>
    )
}