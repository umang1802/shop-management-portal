import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ShopRoutes from './routes';

const App = () => {
  return (
    <Router>
      <ShopRoutes />
    </Router>
  );
};

export default App;
