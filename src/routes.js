import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./container/Dashboard";
import Employees from "./container/Emplopyees";
import Offer from "./container/SpecialOrders";
import Expense from "./container/Expense";
import LoginScreen from "./LoginScreen";
import { AuthContext } from "./authentication/AuthContext";
import Bills from './container/Bills'
import ProductDetailPage from "./component/ProductDetailPage";
import Home from "./container/Home";
import AccessDenied from "./AccessDenied";
import EmployeeDetailPage from "./component/EmployeeDetailPage";
import TaskRequest from "./container/TaskRequest";


const ShopRoutes = () => {
  const user = JSON.parse(localStorage.getItem('user')) || '';

  return (
    <AuthContext.Consumer>
      {({ role }) => (
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route
            path="/"
            element={
              user?.name ? (
                <Layout>
                  {" "}
                  {(role || user.role === 'admin' ) ?<Home/>: <AccessDenied/>}
                </Layout>
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/product"
            element={
              user.name ? (
                <Layout>
                  {" "}
                  {((role || user.role=== 'admin') ||(role || user.role ==='outlet_manager')) ?<Dashboard />: <AccessDenied/>}
                </Layout>
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/special-order"
            element={
              user.name ? (
                <Layout>
                  {" "}
                  {((role || user.role=== 'admin') ||(role || user.role ==='outlet_manager')) ?<Offer />: <AccessDenied/>}
                </Layout>
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/expense"
            element={
              user.name ? (
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
              user.name ? (
                <Layout>
                  {" "}
                  {((role || user.role=== 'admin') ||(role || user.role ==='outlet_manager')) ? <Bills />: 
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
              user.name ? (
                <Layout>
                  {" "}
                  {((role || user.role=== 'admin') ||(role || user.role ==='outlet_manager')) ?<ProductDetailPage /> : <AccessDenied/>}
                </Layout>
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/employee"
            element={
              user.name ? (
                <Layout>
                  {" "}
                  {((role || user.role=== 'admin')) ? <Employees /> : <AccessDenied/>}
                </Layout>
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/employee/:employeeId"
            element={
              user.name ? (
                <Layout>
                  {" "}
                  {((role || user.role=== 'admin') ||(role || user.role ==='outlet_manager')) ?<EmployeeDetailPage /> : <AccessDenied/>}
                </Layout>
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/request"
            element={
              user.name ? (
                <Layout>
                  {" "}
                   <TaskRequest /> 
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
