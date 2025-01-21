import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import ButtonComponent from '../common/ButtonComponent';
import useAuth from '../../hooks/useAuth';
import UserMenu from '../common/UserMenu';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, userId, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // 로그아웃 후 홈으로 이동
    } catch (error) {
      console.error('로그아웃 처리 중 오류:', error.message);
    }
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  if (isLoading) {
    return (
      <header className="header bg-white shadow-sm">
        <div className="text-center py-3">로딩 중...</div>
      </header>
    );
  }

  return (
    <header className="header bg-white shadow-sm">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button
            className="navbar-brand fw-bold fs-4 btn btn-link p-0 text-decoration-none"
            onClick={() => navigateTo('/')}
          >
            F(X)
          </button>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="토글 메뉴"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link ${
                    location.pathname === '/' ? 'active fw-bold' : ''
                  }`}
                  onClick={() => navigateTo('/')}
                >
                  환율 계산기
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link ${
                    location.pathname === '/community' ? 'active fw-bold' : ''
                  }`}
                  onClick={() => navigateTo('/community')}
                >
                  커뮤니티
                </button>
              </li>
            </ul>

            <div className="d-flex align-items-center">
              {!isAuthenticated ? (
                <>
                  <ButtonComponent
                    className="btn btn-outline-secondary me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                  >
                    로그인
                  </ButtonComponent>
                  <ButtonComponent
                    className="btn btn-primary"
                    onClick={() => navigateTo('/register')}
                  >
                    회원가입
                  </ButtonComponent>
                </>
              ) : (
                <UserMenu handleLogout={handleLogout} userId={userId} />
              )}
            </div>
          </div>
        </div>
      </nav>
      <LoginModal />
    </header>
  );
};

export default Header;
