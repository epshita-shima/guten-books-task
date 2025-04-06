import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../../components/BookCard";

const Home = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  const fetchBooks = (page) => {
    axios.get(`https://gutendex.com/books/?page=${page}`).then((res) => {
      setAllBooks(res.data.results);
      setFilteredBooks(res.data.results);
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
    });
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);
 

  useEffect(() => {
    let result = allBooks;
    if (searchTerm) {
      result = result.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (genre) {
      result = result.filter(
        (book) => book.subjects && book.subjects.includes(genre)
      );
    }
    setFilteredBooks(result);
  }, [allBooks, genre, searchTerm]);

  const genres = Array.from(
    new Set(allBooks.flatMap((book) => book.subjects || []))
  );
  
  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title"
          className="p-2 border rounded w-full md:w-1/2"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded w-full md:w-1/2"
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={!prevUrl}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          disabled={!nextUrl}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
