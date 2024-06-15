// src/components/Router.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/login-page';
import ClientPage from 'pages/client/client';
import RequireAuth from 'pages/auth/require-auth';
import Layout from 'pages/home/home';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
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
    </Routes>
  );
};

export default Router;
