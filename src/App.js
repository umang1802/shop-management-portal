import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ShopRoutes from './routes';
import { AuthProvider } from './authentication/AuthContext';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <AuthProvider>
        <ShopRoutes />
      </AuthProvider>
    </Router>
    </Provider>
  );
};

export default App;
