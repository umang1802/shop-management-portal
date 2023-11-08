import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./container/Dashboard";
import Emplopyees from "./container/Emplopyees";
import Offer from "./container/SpecialOrders";
import Expense from "./container/Expense";
import LoginScreen from "./LoginScreen";
import { AuthContext } from "./authentication/AuthContext";
import Bills from './container/Bills'
import ProductDetailPage from "./component/ProductDetailPage";
import Home from "./container/Home";
import AccessDenied from "./AccessDenied";
import EmployeeDetailPage from "./component/EmployeeDetailPage";


const ShopRoutes = () => {
  const storedUsername = localStorage.getItem('username');
  const storedRole = localStorage.getItem('role');

  return (
    <AuthContext.Consumer>
      {({ role }) => (
        <Routes>
          {console.log(role,storedUsername)}
          <Route path="/login" element={<LoginScreen />} />
          <Route
            path="/"
            element={
              storedUsername ? (
                <Layout>
                  {" "}
                  {(role || storedRole === 'admin' ) ?<Home/>: <AccessDenied/>}
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
                  {((role || storedRole=== 'admin') ||(role || storedRole ==='outlet_manager')) ?<Dashboard />: <AccessDenied/>}
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
                  {((role || storedRole=== 'admin') ||(role || storedRole ==='outlet_manager')) ?<Offer />: <AccessDenied/>}
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
                  {((role || storedRole=== 'admin') ||(role || storedRole ==='outlet_manager')) ? <Bills />: 
                   <AccessDenied/>}
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
                  {((role || storedRole=== 'admin') ||(role || storedRole ==='outlet_manager')) ?<ProductDetailPage /> : <AccessDenied/>}
                </Layout>
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/employee"
            element={
              storedUsername ? (
                <Layout>
                  {" "}
                  {((role || storedRole=== 'admin')) ? <Emplopyees /> : <AccessDenied/>}
                </Layout>
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/employee/:employeeId"
            element={
              storedUsername ? (
                <Layout>
                  {" "}
                  {((role || storedRole=== 'admin') ||(role || storedRole ==='outlet_manager')) ?<EmployeeDetailPage /> : <AccessDenied/>}
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
