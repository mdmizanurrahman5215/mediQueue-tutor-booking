'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ActiveLink from '../common/ActiveLink';

import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  User, 
  LogOut, 
  BookOpen, 
  PlusCircle, 
  Calendar 
} from 'lucide-react';

export default function Navbar() {
  // Demo State (Replace this with your Auth Context / Firebase Auth State)
  const [user, setUser] = useState({
    displayName: 'Arosh Chowdhury',
    email: 'arosh@gmail.com',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  });

  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Toggle Theme Logic
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogout = () => {
    setUser(null);
    setIsProfileOpen(false);
    // Add your JWT/Auth logout logic here
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Website Name */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
              M
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
              MediQueue
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <ActiveLink href="/">Home</ActiveLink>
            <ActiveLink href="/tutors">Tutors</ActiveLink>

            {/* Protected Routes - Only Visible After Login */}
            {user && (
              <>
                <ActiveLink href="/add-tutor">Add Tutor</ActiveLink>
                <ActiveLink href="/my-tutors">My Tutors</ActiveLink>
                <ActiveLink href="/my-booked-sessions">My Booked Sessions</ActiveLink>
              </>
            )}
          </div>

          {/* Right Section: Theme Toggle & User Profile / Login */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>

            {/* Auth Buttons or Profile Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center focus:outline-none ring-2 ring-blue-500 rounded-full p-0.5"
                >
                  <img
                    src={user.photoURL || 'https://via.placeholder.com/150'}
                    alt={user.displayName || 'User Profile'}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {user.displayName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center space-x-2 transition-colors mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 pt-2 pb-4 space-y-1">
          <ActiveLink href="/" onClick={() => setIsMenuOpen(false)}>Home</ActiveLink>
          <ActiveLink href="/tutors" onClick={() => setIsMenuOpen(false)}>Tutors</ActiveLink>

          {user && (
            <>
              <ActiveLink href="/add-tutor" onClick={() => setIsMenuOpen(false)}>Add Tutor</ActiveLink>
              <ActiveLink href="/my-tutors" onClick={() => setIsMenuOpen(false)}>My Tutors</ActiveLink>
              <ActiveLink href="/my-booked-sessions" onClick={() => setIsMenuOpen(false)}>My Booked Sessions</ActiveLink>
            </>
          )}

          {user ? (
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-2">
              <div className="flex items-center space-x-3 mb-3 px-2">
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-9 h-9 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{user.displayName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col space-y-2">
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-center py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-lg"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-center py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}