   // src/components/ProtectedRoute.js

   import React from 'react';
   import { Navigate } from 'react-router-dom';
   import { useUser } from '../context/UserContext';

   const ProtectedRoute = ({ children }) => {
     const { user } = useUser();

     if (!user) {
       // If user is not logged in, redirect to login page
       return <Navigate to="/login" replace />;
     }

     // If user is logged in, render the children components
     return children;
   };

   export default ProtectedRoute;