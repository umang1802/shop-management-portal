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

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = React.useContext(AuthContext);

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

const ShopRoutes = () => {
  return (
    <AuthContext.Consumer>
      {({ isAuthenticated }) => (
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
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
            path="/product"
            element={
              isAuthenticated ? (
                <Layout>
                  {" "}
                  <Products />
                </Layout>
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/special-order"
            element={
              isAuthenticated ? (
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
              isAuthenticated ? (
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
              isAuthenticated ? (
                <Layout>
                  {" "}
                  <Bills />
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
