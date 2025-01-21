import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 로컬 스토리지 값 동기화
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated') === 'true';
    const storedUserId = localStorage.getItem('userId');

    if (storedAuth && storedUserId) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
    } else {
      setIsAuthenticated(false);
      setUserId(null);
    }
    setIsLoading(false);
  }, []);

  // 세션 유효성 검증 로직
  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await axios.get('/api/v1/auth', { withCredentials: true });
        const { isLoggedIn, userId: verifiedUserId } = response.data;

        if (isLoggedIn && verifiedUserId) {
          setIsAuthenticated(true);
          setUserId(verifiedUserId);
          localStorage.setItem('userId', verifiedUserId);
          localStorage.setItem('isAuthenticated', 'true');
        } else {
          throw new Error('세션 검증 실패');
        }
      } catch (error) {
        console.warn('세션 확인 중 오류 발생:', error.message);
        setIsAuthenticated(false);
        setUserId(null);
        localStorage.removeItem('userId');
        localStorage.removeItem('isAuthenticated');
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = (id) => {
    if (!id) {
      console.error('로그인 시 userId가 비어 있습니다.');
      return;
    }
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
