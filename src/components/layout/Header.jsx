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

  return (
    <header className="header bg-white shadow-sm sticky-top">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
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
                  {/* 로그인 버튼 */}
                  <button
                    className="btn login-btn me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                    onClick={() => console.log('로그인 버튼 클릭')}
                  >
                    로그인
                  </button>

                  {/* 회원가입 버튼 */}
                  <ButtonComponent
                    className="btn-primary"
                    onClick={() => navigateTo('/register')}
                    variant="primary"
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
