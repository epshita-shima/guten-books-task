import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const BookCard = ({book}) => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const isWished = wishlist.includes(book.id);
  const toggleWishlist = () => {
    let newList;
    if (isWished) {
      newList = wishlist.filter((id) => id !== book.id);
    } else {
      newList = [...wishlist, book.id];
    }

    // Update wishlist in state and localStorage
    setWishlist(newList);
    localStorage.setItem("wishlist", JSON.stringify(newList));
  };
  return (
    <div className="bg-white p-4 rounded shadow">
    <img src={book.formats['image/jpeg']} alt={book.title} className="w-full h-48 object-cover rounded" />
    <h2 className="font-bold mt-2 text-lg">{book.title}</h2>
    <p className="text-sm text-gray-600">{book.authors?.[0]?.name || 'Unknown Author'}</p>
    <p className="text-xs text-gray-400">{book.subjects?.[0]}</p>
    <div className="flex justify-between items-center mt-2">
      <Link to={`/book/${book.id}`} className="text-blue-500 text-sm">Details</Link>
      <button onClick={toggleWishlist} className="text-red-500 text-xl">
        {isWished ? '❤️' : '🤍'}
      </button>
    </div>
  </div>
  )
}

export default BookCard
