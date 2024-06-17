import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/login-page';
import RequireAuth from 'pages/auth/require-auth';
import ClientPage from 'pages/client/client';
import CategoryPage from 'pages/category/category';
import AddressPage from 'pages/address/address';
import ProductPage from 'pages/product/product';
import OrderPage from 'pages/order/order';
import SalesOrderPage from 'pages/order/sales-order';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <OrderPage />
          </RequireAuth>
        }
      />
      <Route
        path="/category"
        element={
          <RequireAuth>
            <CategoryPage />
          </RequireAuth>
        }
      />
      <Route
        path="/address"
        element={
          <RequireAuth>
            <AddressPage />
          </RequireAuth>
        }
      />
      <Route
        path="/client"
        element={
          <RequireAuth>
            <ClientPage />
          </RequireAuth>
        }
      />
      <Route
        path="/product"
        element={
          <RequireAuth>
            <ProductPage />
          </RequireAuth>
        }
      />
      <Route
        path="/order"
        element={
          <RequireAuth>
            <OrderPage />
          </RequireAuth>
        }
      />
      <Route
        path="/sales-order"
        element={
          <RequireAuth>
            <SalesOrderPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default Router;
