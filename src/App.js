import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ShopRoutes from './routes';
import { AuthProvider } from './authentication/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ShopRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;
