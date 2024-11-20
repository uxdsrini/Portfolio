import React, { useState, useEffect } from 'react';
import { Menu, X, User, Home, MessageCircle } from 'lucide-react';
import { auth } from '../lib/firebase';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [showDashboard, setShowDashboard] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowLogin(false);
      setEmail('');
      setPassword('');
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    if (path === '/') {
      setShowDashboard(false);
      window.location.href = '/';
    } else if (path === 'dashboard') {
      setShowDashboard(true);
    } else if (path === 'chat') {
      window.location.href = '/chat';
    } else {
      const element = document.querySelector(
        path.startsWith('#') ? path : `#${path}`
      );
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn('Section not found:', path);
      }
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('/')}
              className="text-2xl font-bold text-primary hover:text-secondary transition-colors"
            >
              UXDSrini
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <button
                  onClick={() => handleNavigation('/')}
                  className="flex items-center text-gray-700 hover:text-primary transition-colors"
                >
                  <Home className="w-5 h-5 mr-1" />
                  Home
                </button>
                <button
                  onClick={() => handleNavigation('dashboard')}
                  className="flex items-center text-gray-700 hover:text-primary transition-colors"
                >
                  <User className="w-5 h-5 mr-1" />
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-primary transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation('#about')}
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => handleNavigation('#projects')}
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => handleNavigation('#projects')}
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Projects
                </button>
                <button
                  onClick={() => handleNavigation('chat')}
                  className="flex items-center text-gray-700 hover:text-primary transition-colors"
                >
                  <MessageCircle className="w-5 h-5 mr-1" />
                  Chat
                </button>
                <button
                  onClick={() => setShowLogin(true)}
                  className="flex items-center text-gray-700 hover:text-primary transition-colors"
                >
                  <User className="w-5 h-5 mr-1" />
                  Admin
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user ? (
              <>
                <button
                  onClick={() => handleNavigation('/')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                >
                  <span className="flex items-center">
                    <Home className="w-5 h-5 mr-2" />
                    Home
                  </span>
                </button>
                <button
                  onClick={() => handleNavigation('dashboard')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                >
                  <span className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Dashboard
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation('#about')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => handleNavigation('#services')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => handleNavigation('#projects')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                >
                  Projects
                </button>
                <button
                  onClick={() => handleNavigation('chat')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                >
                  <span className="flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat
                  </span>
                </button>
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                >
                  <span className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Admin
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Admin Login</h2>
              <button
                onClick={() => setShowLogin(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}