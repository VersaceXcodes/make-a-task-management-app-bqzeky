import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UV_Landing from './components/views/UV_Landing';
import UV_SignIn from './components/views/UV_SignIn';
import UV_SignUp from './components/views/UV_SignUp';
import UV_Dashboard from './components/views/UV_Dashboard';
import UV_TaskBoard from './components/views/UV_TaskBoard';
import UV_ProjectList from './components/views/UV_ProjectList';
import UV_Profile from './components/views/UV_Profile';
import UV_Settings from './components/views/UV_Settings';
import UV_ForgotPassword from './components/views/UV_ForgotPassword';
import GV_PublicTopNav from './components/views/GV_PublicTopNav';
import GV_TopNav from './components/views/GV_TopNav';
import GV_SideNav from './components/views/GV_SideNav';
import GV_Footer from './components/views/GV_Footer';

interface Task {
  id: number;
  title: string;
  status: 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

type SortOption = 'created' | 'priority' | 'alphabetical';

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <GV_PublicTopNav />
    {children}
    <GV_Footer />
  </div>
);

const PrivateLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-50 flex">
    <GV_SideNav />
    <div className="flex-1 flex flex-col">
      <GV_TopNav />
      <main className="flex-1 p-6">
        {children}
      </main>
      <GV_Footer />
    </div>
  </div>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing auth token on mount
  React.useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><UV_Landing /></PublicLayout>} />
        <Route path="/signin" element={<PublicLayout><UV_SignIn /></PublicLayout>} />
        <Route path="/signup" element={<PublicLayout><UV_SignUp /></PublicLayout>} />
        <Route path="/forgot-password" element={<PublicLayout><UV_ForgotPassword /></PublicLayout>} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <PrivateLayout><UV_Dashboard /></PrivateLayout>
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/tasks"
          element={
            isAuthenticated ? (
              <PrivateLayout><UV_TaskBoard /></PrivateLayout>
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/projects"
          element={
            isAuthenticated ? (
              <PrivateLayout><UV_ProjectList /></PrivateLayout>
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <PrivateLayout><UV_Profile /></PrivateLayout>
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/settings"
          element={
            isAuthenticated ? (
              <PrivateLayout><UV_Settings /></PrivateLayout>
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />

        {/* Catch all - redirect to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}