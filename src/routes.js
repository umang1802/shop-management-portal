import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './container/Dashboard';
import Products from './container/Products';
import Offer from './container/Offer';
import Bills from './container/Bills';
import Expense from './container/Expense';
import LoginScreen from './LoginScreen';
import AuthContext from './authentication/AuthContext'


const ShopRoutes = () => {
  return (
    <AuthContext.Consumer>
      {value => (
    <Layout>
      <Routes>
        <Route  path="/" element={<LoginScreen />} />
        <Route path="/procuct" element={<Products />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/expense" element={<Expense />} />
        {/* Add more routes here */}
      </Routes>
    </Layout> 
    )}
    </AuthContext.Consumer>

  );
};

export default ShopRoutes;