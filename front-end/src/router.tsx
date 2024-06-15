// src/components/Router.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/login-page';

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
};

export default Router;
