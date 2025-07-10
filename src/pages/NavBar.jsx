import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">
          <Link to="/">Portfolio</Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
          <Link to="/skills" className="text-gray-700 hover:text-blue-600">
            Skills
          </Link>
          <Link to="/project" className="text-gray-700 hover:text-blue-600">
            Projects
          </Link>
          <Link to="/experience" className="text-gray-700 hover:text-blue-600">
            Experience
          </Link>
          <Link to="/education" className="text-gray-700 hover:text-blue-600">
            Education
          </Link>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              // Close icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Hamburger icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow-inner">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 hover:text-blue-600"
          >
            About
          </Link>
          <Link
            to="/skills"
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 hover:text-blue-600"
          >
            Skills
          </Link>
          <Link
            to="/project"
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 hover:text-blue-600"
          >
            Projects
          </Link>
           <Link
            to="/experience"
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 hover:text-blue-600"
          >
            Experience
          </Link>
          <Link
            to="/education"
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 hover:text-blue-600"
          >
            Education
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
