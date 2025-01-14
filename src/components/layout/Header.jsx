import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginModal from './LoginModal';
import ButtonComponent from '../common/ButtonComponent';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const location = useLocation();
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* 로고 */}
          <Link className="navbar-brand fw-bold" to="/">
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
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">
                  환율 계산기
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/community' ? 'active' : ''}`}
                  to="/community"
                >
                  커뮤니티
                </Link>
              </li>
            </ul>

            {/* 인증 버튼 */}
            <div className="d-flex auth-buttons">
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
                <ButtonComponent className="btn btn-danger" onClick={logout}>
                  로그아웃
                </ButtonComponent>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 로그인 모달 */}
      <LoginModal onLogin={login} />
    </header>
  );
};

export default Header;
