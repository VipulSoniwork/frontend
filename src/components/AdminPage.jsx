import React from 'react';
import { useAuth } from '../context/AuthContext';

export const AdminPage = () => {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">Admin Dashboard</h1>
        <p className="mb-4">Welcome, {user?.username}!</p>
        <p className="mb-6">You have full administrative access.</p>
        <button 
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

