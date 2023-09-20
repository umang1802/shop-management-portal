import React, { useState } from 'react';

// Create a new context for authentication
const AuthContext = React.createContext();

// Create a provider component to wrap the application
const AuthProvider = ({ children }) => {
  const [role, setRole] = useState('');

  const getRole = () => {
    // Perform your login logic here
    setRole(localStorage.getItem('role'));
  };


  // Pass the authentication state and actions to the value prop
  const authContextValue = {
    role,
    getRole,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
