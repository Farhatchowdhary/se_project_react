import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, isLoggedIn }) {
  console.log("isLoggedIn state:", isLoggedIn);

  // If user is not logged in, redirect to main page
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  
  // If user is logged in, show the protected content
  return children;
}

export default ProtectedRoute;