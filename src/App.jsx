import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import { AuthProvider, useAuth } from './context/AuthProvider'; // Import useAuth
import Header from './components/others/Header'; // Assuming Header handles logout display

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role } = useAuth();

  if (!user || !role) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Logged in but wrong role, redirect to login (or a specific unauthorized page)
    // You might want a more user-friendly approach here
    return <Navigate to="/login" replace />;
  }

  // Authorized
  return children;
};


function AppContent() {
  const { user, role } = useAuth(); // Get user and role from context

  return (
    <div className="flex flex-col min-h-screen">
       {user && <Header />} {/* Show Header only when logged in */}
      <main className="flex-grow">
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={!user ? <Login /> : (role === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/employee/dashboard" replace />)} />

          {/* Protected Admin Route */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
           {/* Add other admin routes here within ProtectedRoute */}


          {/* Protected Employee Route */}
          <Route
            path="/employee/dashboard"
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />
          {/* Add other employee routes here within ProtectedRoute */}


          {/* Default route: Redirect to login if not logged in, or appropriate dashboard if logged in */}
          <Route
            path="*"
            element={
              user
                ? (role === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/employee/dashboard" replace />)
                : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </main>
    </div>
  );
}


function App() {
  return (
    <AuthProvider> {/* Wrap everything in AuthProvider */}
      <Router>
        <AppContent /> {/* Use AppContent to access auth context */}
      </Router>
    </AuthProvider>
  );
}

export default App;
