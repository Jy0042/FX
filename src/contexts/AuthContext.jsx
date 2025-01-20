import React, { createContext, useState } from 'react';

// AuthContext 생성
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null); // userId 추가

  const login = (id) => {
    setIsAuthenticated(true);
    setUserId(id);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
