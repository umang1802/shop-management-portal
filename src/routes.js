import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./container/Dashboard";
import Products from "./container/Products";
import Offer from "./container/SpecialOrders";
import Expense from "./container/Expense";
import LoginScreen from "./LoginScreen";
import { AuthContext } from "./authentication/AuthContext";
import Bills from './container/Bills'
import ProductDetailPage from "./component/ProductDetailPage";


const ShopRoutes = () => {
  const storedUsername = localStorage.getItem('username');
  return (
    <AuthContext.Consumer>
      {({ isAuthenticated }) => (
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route
            path="/"
            element={
              storedUsername ? (
                <Layout>
                  {" "}
                </Layout>
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/product"
            element={
              storedUsername ? (
                <Layout>
                  {" "}
                  <Dashboard />
                </Layout>
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/special-order"
            element={
              storedUsername ? (
                <Layout>
                  {" "}
                  <Offer />
                </Layout>
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/expense"
            element={
              storedUsername ? (
                <Layout>
                  {" "}
                  <Expense />
                </Layout>
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/bills"
            element={
              storedUsername ? (
                <Layout>
                  {" "}
                  <Bills />
                </Layout>
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/pdp/:productId"
            element={
              storedUsername ? (
                <Layout>
                  {" "}
                  <ProductDetailPage />
                </Layout>
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/priceUpdate"
            element={
              storedUsername ? (
                <Layout>
                  {" "}
                  <Products />
                </Layout>
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
        </Routes>
      )}
    </AuthContext.Consumer>
  );
};

export default ShopRoutes;
