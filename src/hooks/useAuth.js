import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('`useAuth`는 `AuthProvider` 내부에서만 호출되어야 합니다.');
  }
  return context;
};

export default useAuth;
