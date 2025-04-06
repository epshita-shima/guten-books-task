import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BookCard from '../../components/BookCard';

const Wishlist = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
   const booksData= Promise.all(
      wishlist.map(id => axios.get(`https://gutendex.com/books/${id}`).then(res => res.data))
    )
    setBooks(booksData)
  }, []);
  return (
    <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Wishlist</h2>
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  </div>
  )
}

export default Wishlist
