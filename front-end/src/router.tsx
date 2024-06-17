import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/login-page';
import RequireAuth from 'pages/auth/require-auth';
import HomePage from 'pages/home/home';
import ClientPage from 'pages/client/client';
import CategoryPage from 'pages/category/category';
import AddressPage from 'pages/address/address';
import ProductPage from 'pages/product/product';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <HomePage />
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
    </Routes>
  );
};

export default Router;
