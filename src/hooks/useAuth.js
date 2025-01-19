import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuth는 AuthProvider 내부에서만 호출되어야 합니다. App.jsx에서 AuthProvider를 확인하세요.'
    );
  }
  return context;
};

export default useAuth;
