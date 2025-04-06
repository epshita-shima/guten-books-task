import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`https://gutendex.com/books/${id}`).then(res => setBook(res.data));
  }, [id]);

  if (!book) return <div className="p-4">Loading...</div>;
  return (
    <div className="p-4">
    <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
    <img src={book.formats['image/jpeg']} alt={book.title} className="w-64 h-auto rounded" />
    <p className="mt-2 text-gray-700">Author: {book.authors?.[0]?.name || 'Unknown'}</p>
    <p className="text-sm text-gray-600 mt-2">Genre: {book.subjects?.join(', ')}</p>
    <p className="text-sm text-gray-400 mt-2">ID: {book.id}</p>
  </div>
  )
}

export default BookDetails
