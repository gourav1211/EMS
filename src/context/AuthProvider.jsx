import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; // Import axios

// Define the API base URL
const API_URL = 'http://localhost:5000/api'; // Adjust if your backend runs on a different port

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user object from backend
  const [role, setRole] = useState(null); // Store user role
  const [loading, setLoading] = useState(false); // Add loading state for login
  const [error, setError] = useState(null); // Add error state for login

  // Remove useEffect that loaded from localStorage

  const login = async (email, password, loginRole) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
        role: loginRole, // Send role to backend
      });

      if (response.data && response.data.user && response.data.role) {
        setUser(response.data.user);
        setRole(response.data.role);
        // Optionally store token if backend sends one for session management
        // localStorage.setItem('token', response.data.token);
      } else {
        // Handle unexpected response format
        setError('Login failed: Invalid response from server.');
        setUser(null);
        setRole(null);
      }
    } catch (err) {
      // Handle login errors (e.g., invalid credentials, server error)
      const message = err.response?.data?.msg || 'Login failed. Please try again.';
      setError(message);
      setUser(null);
      setRole(null);
      console.error("Login error:", err.response || err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setError(null);
    // Optionally remove token if using token-based auth
    // localStorage.removeItem('token');
    // Redirect to login page or home page might happen here or in a component
  };

  // Add functions here later to fetch/update employee data if needed
  // e.g., const fetchEmployeeData = async (employeeId) => { ... }

  return (
    <AuthContext.Provider value={{ user, role, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
