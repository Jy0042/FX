import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginModal from './LoginModal';
import ButtonComponent from '../common/ButtonComponent';
import useAuth from '../../hooks/useAuth';
import { logoutUser } from '../../utils/api';

const Header = () => {
  const location = useLocation();
  const { isAuthenticated, setIsAuthenticated } = useAuth(); // setIsAuthenticated 추가

  const handleLogout = async () => {
    try {
      await logoutUser(); // 로그아웃 요청
      setIsAuthenticated(false); // 클라이언트 상태 초기화
    } catch (error) {
      alert(error.message); // 에러 메시지 표시
    }
  };

  return (
    <header className="header bg-white shadow-sm">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          {/* 로고 */}
          <Link className="navbar-brand fw-bold fs-4" to="/">
            F(X)
          </Link>

          {/* 토글 버튼 */}
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

          {/* 메뉴 */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/' ? 'active fw-bold' : ''}`}
                  to="/"
                >
                  환율 계산기
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === '/community' ? 'active fw-bold' : ''
                  }`}
                  to="/community"
                >
                  커뮤니티
                </Link>
              </li>
            </ul>

            {/* 인증 버튼 */}
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
                  <Link to="/register">
                    <ButtonComponent className="btn btn-primary">회원가입</ButtonComponent>
                  </Link>
                </>
              ) : (
                <>
                  <span className="me-3">환영합니다!</span>
                  <ButtonComponent className="btn btn-danger" onClick={handleLogout}>
                    로그아웃
                  </ButtonComponent>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 로그인 모달 */}
      <LoginModal />
    </header>
  );
};

export default Header;
