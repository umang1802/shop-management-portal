import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './container/Dashboard';
import Products from './container/Products';
import Offer from './container/Offer';
import Bills from './container/Bills';
import Expense from './container/Expense';


const ShopRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route  path="/" element={<Dashboard />} />
        <Route path="/procuct" element={<Products />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/expense" element={<Expense />} />
        {/* Add more routes here */}
      </Routes>
    </Layout>
  );
};

export default ShopRoutes;