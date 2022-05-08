import React, { useContext, useEffect, useState } from 'react';
import UnAuthorizedApp from './UnAuthorizedApp';
import AuthorizedApp from './AuthorizedApp';
import { useAuth } from './hooks';
import { AuthContext } from './context';
import './App.css';
import { Spin } from 'antd';

function App() {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(AuthContext);
  const { validateToken } = useAuth();

  const checkToken = () => {
    const token = localStorage.getItem('SMB_TOKEN');
    if (!token) {
      return setIsAuthenticated(false);
    }
    validateToken(token)
      .then(response => response.json())
      .then(({ user }) => {
        if (!user) {
          return setIsAuthenticated(false);
        }
        setUser(user);
        setIsAuthenticated(true);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      checkToken();
    }, 3000);
  }, []);

  if (isAuthenticated === undefined) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin spinning size="large" />
      </div>
    );
  }

  if (isAuthenticated === false) {
    return <UnAuthorizedApp />;
  }

  if (isAuthenticated === true) {
    return <AuthorizedApp />;
  }
}

export default App;
