import React, { useState } from 'react';

// Create a new context for authentication
const AuthContext = React.createContext();

// Create a provider component to wrap the application
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Perform your login logic here
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Perform your logout logic here
    setIsAuthenticated(false);
  };

  // Pass the authentication state and actions to the value prop
  const authContextValue = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
