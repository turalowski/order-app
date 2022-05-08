import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Register, Login } from './containers';
const UnAuthorizedApp = () => {
  return (
    <Routes>
      <Route exact path="login" element={<Login />} />
      <Route exact path="register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default UnAuthorizedApp;
