import React from 'react';
import { Navigate } from 'react-router-dom';

const Logout = ({ setIsAuthenticated }) => {
  setIsAuthenticated(false);
  return <Navigate to="/" />;
};

export default Logout;
