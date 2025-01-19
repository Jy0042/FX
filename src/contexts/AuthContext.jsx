import React, { createContext, useState } from 'react';

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트 정의 및 내보내기
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true); // 로그인 함수
  const logout = () => setIsAuthenticated(false); // 로그아웃 함수

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
