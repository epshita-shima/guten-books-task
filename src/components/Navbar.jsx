import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
    <h1 className="text-xl font-bold text-blue-600">GutenBooks</h1>
    <div className="space-x-4">
      <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
      <Link to="/wishlist" className="text-gray-700 hover:text-blue-600">Wishlist</Link>
    </div>
  </nav>
  )
}

export default Navbar
