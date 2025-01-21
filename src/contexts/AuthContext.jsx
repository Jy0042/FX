import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  const login = (id) => {
    setIsAuthenticated(true);
    setUserId(id);
    localStorage.setItem('userId', id);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = async () => {
    try {
      await axios.delete('/api/v1/auth/logout', { withCredentials: true });
      setIsAuthenticated(false);
      setUserId(null);
      localStorage.removeItem('userId');
      localStorage.removeItem('isAuthenticated');
    } catch (error) {
      console.error('로그아웃 처리 중 오류:', error);
    }
  };

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await axios.get('/api/v1/auth', { withCredentials: true });
        setIsAuthenticated(response.data.isLoggedIn);
        setUserId(response.data.userId || null);
      } catch {
        setIsAuthenticated(false);
        setUserId(null);
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };

    verifySession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userId, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
