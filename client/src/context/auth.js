import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [user, setUser] = useState(undefined);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
