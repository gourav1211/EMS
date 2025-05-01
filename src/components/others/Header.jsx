import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider'; // Import useAuth
import { useNavigate } from 'react-router-dom';

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
    <header className="bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold">{welcomeMessage}</h1>
        <button onClick={() => setIsDark(!isDark)} className="text-2xl focus:outline-none">
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
      {user && ( // Only show logout if user is logged in
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white dark:text-gray-100 font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
