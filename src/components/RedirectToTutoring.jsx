import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Login from './Login';

const RedirectToTutoring = () => {
  const { user } = useUser();

  if (user) {
    // Redirect to tutoring page if authenticated
    return <Navigate to="/tutoring" replace />;
  }

  // Render login component if not authenticated
  return <Login />;
};

export default RedirectToTutoring; 