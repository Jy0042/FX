import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { checkSession } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated') === 'true';
    const storedUserId = localStorage.getItem('userId');

    if (storedAuth && storedUserId) {
      const verifySession = async () => {
        try {
          const sessionData = await checkSession();
          if (sessionData.isLoggedIn) {
            setIsAuthenticated(true);
            setUserId(sessionData.userId);
          } else {
            throw new Error('세션이 유효하지 않습니다.');
          }
        } catch (error) {
          console.warn('세션 검증 실패:', error.message);
          setIsAuthenticated(false);
          setUserId(null);
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userId');
        } finally {
          setIsLoading(false);
        }
      };

      verifySession();
    } else {
      setIsAuthenticated(false);
      setUserId(null);
      setIsLoading(false);
    }
  }, []);

  const login = (userId, callback) => {
    setIsAuthenticated(true);
    setUserId(userId);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userId', userId);

    // 로그인 후 콜백 실행
    if (callback) callback();
  };

  const logout = async () => {
    try {
      await axios.delete('/api/v1/auth/logout', { withCredentials: true });
      setIsAuthenticated(false);
      setUserId(null);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userId');

      // 페이지 새로고침
      window.location.reload();
    } catch (error) {
      console.error('로그아웃 처리 중 오류:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
