import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import { AdminPage } from './components/AdminPage';
import { EditorPage } from './components/EditorPage';
import { UserPage } from './components/UserPage';
import { useAuth } from './context/AuthContext';

// Unauthorized Component
const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
        <p className="mb-4">You do not have permission to access this page.</p>
        <a href="/login" className="text-blue-500 hover:underline">Return to Login</a>
      </div>
    </div>
  );
};

// Home Redirector
const HomeRedirector = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  switch(user.role) {
    case 'admin':
      return <Navigate to="/admin" />;
    case 'editor':
      return <Navigate to="/editor" />;
    case 'user':
      return <Navigate to="/user" />;
    default:
      return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Home Route with Role-based Redirection */}
          <Route path="/" element={<HomeRedirector />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['editor']} />}>
            <Route path="/editor" element={<EditorPage />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['user']} />}>
            <Route path="/user" element={<UserPage />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;