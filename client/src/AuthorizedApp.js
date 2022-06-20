import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainHeader, MainNavigation } from './components';
import { Relations, Stocks, Catalogs, Products, Reports, Trade } from './containers';
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
          <Route exact path="products" element={<Products />} />
          <Route exact path="trade" element={<Trade />} />
          <Route exact path="reports" element={<Reports />} />

          <Route path="*" element={<Navigate to="/relations" />} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default AuthorizedApp;
