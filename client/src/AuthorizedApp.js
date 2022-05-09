import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainHeader, MainNavigation } from './components';
import { Relations, Stocks, Catalogs } from './containers';
import { Layout } from 'antd';

const AuthorizedApp = () => {
  return (
    <Layout>
      <MainHeader />
      <Layout>
        <MainNavigation />
        <Routes>
          <Route exact path="relations" element={<Relations />} />
          <Route exact path="stocks" element={<Stocks />} />
          <Route exact path="catalogs" element={<Catalogs />} />
          <Route path="*" element={<Navigate to="/relations" />} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default AuthorizedApp;
