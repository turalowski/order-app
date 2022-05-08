import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainHeader, MainNavigation } from './components';
import { Relations, Stocks } from './containers';

const AuthorizedApp = () => {
  return (
    <>
      <MainHeader />
      
      <div style={{ display: 'flex' }}>
      <MainNavigation />
        <Routes>
          <Route exact path="relations" element={<Relations />} />
          <Route exact path="stocks" element={<Stocks />} />
          <Route path="*" element={<Navigate to="/relations" />} />
        </Routes>
      </div>
    </>
  );
};

export default AuthorizedApp;
