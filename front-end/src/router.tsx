import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/login-page';
import RequireAuth from 'pages/auth/require-auth';
import HomePage from 'pages/home/home';
import ClientPage from 'pages/client/client';
import CategoryPage from 'pages/category/category';

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
    </Routes>
  );
};

export default Router;
