import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider'; // Import useAuth
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const Header = () => {
  const { user, role, logout } = useAuth(); // Get user, role, and logout from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  // Track theme state, default to saved preference or light
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Update root class and localStorage when theme changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Determine the welcome message based on user data
  const welcomeMessage = user
    ? `Welcome, ${role === 'admin' ? 'Admin' : user.firstName}` // Use firstName for employee
    : 'Employee Management System';

  return (
    <header className="glassmorphism sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 py-3 px-4 md:px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="EMS Logo" className="h-10 w-10" />
          <h1 className="text-xl font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            {welcomeMessage}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsDark(!isDark)} 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          
          {user && (
            <button
              onClick={handleLogout}
              className="btn-danger flex items-center space-x-1 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 3a1 1 0 10-2 0v6.58l-1.29-1.3a1 1 0 10-1.42 1.42l3 3a1 1 0 001.42 0l3-3a1 1 0 00-1.42-1.42L14 12.58V6z" clipRule="evenodd" />
              </svg>
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
