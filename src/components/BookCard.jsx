import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const BookCard = ({ book }) => {
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
    <div className="bg-white p-4 rounded shadow flex flex-col justify-between h-[400px]">
      <div className="overflow-hidden rounded h-48">
        <motion.img
          src={book.formats["image/jpeg"]}
          alt={book.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>
      <div className="flex-1 mt-2">
        <h2 className="font-bold text-lg line-clamp-2">{book.title}</h2>
        <p className="text-sm text-gray-600">
          {book.authors?.[0]?.name || "Unknown Author"}
        </p>
        <p className="text-xs text-gray-400">{book.subjects?.[0]}</p>
      </div>
      <div className="flex justify-between items-center mt-2">
        <Link
          to={`/book/${book.id}`}
          className="text-blue-500 text-sm font-medium"
        >
          Details
        </Link>
        <button onClick={toggleWishlist} className="text-red-500 text-xl">
          <FontAwesomeIcon
            icon={faHeart}
            className={`${isWished ? " text-red-600" : "text-gray-200"}`}
          ></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
};

export default BookCard;
