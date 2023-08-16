import './App.css';
import Header from './common/Header';
import React from 'react';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
}

export default App;