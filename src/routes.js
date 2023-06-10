import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './container/Dashboard';
import Products from './container/Products';
import Offer from './container/Offer';
import Bills from './container/Bills';
import Expense from './container/Expense';
import LoginScreen from './LoginScreen';
import { AuthContext } from './authentication/AuthContext';

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
                                    <PrivateRoute
                                        path="/"
                                        component={Dashboard}
                                    />
                                    <PrivateRoute
                                        path="/products"
                                        component={Products}
                                    />
                                    <PrivateRoute
                                        path="/offer"
                                        component={Offer}
                                    />
                                    <PrivateRoute
                                        path="/bills"
                                        component={Bills}
                                    />
                                    <PrivateRoute
                                        path="/expense"
                                        component={Expense}
                                    />
                                    {/* Add more routes here */}
                                </Layout>
                            ) : (
                                <Navigate to="/login" replace={true} />
                            )
                        }
                    />
                    <Route path="/*" element={<Navigate to="/" />} />
                </Routes>
            )}
        </AuthContext.Consumer>
    );
};

export default ShopRoutes;
