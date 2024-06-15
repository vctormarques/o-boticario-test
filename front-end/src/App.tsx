import React from 'react';
import Router from './router'; 
import AuthContextProvider from 'store/auth.context';

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
