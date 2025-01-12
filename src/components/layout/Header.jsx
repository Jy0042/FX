import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ButtonComponent from '../common/ButtonComponent'; // 공통 버튼 컴포넌트

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = false; // 예제용, 실제 인증 여부 확인 로직 추가 필요

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* 로고 */}
          <Link className="navbar-brand fw-bold" to="/">
            F(X)
          </Link>

          {/* 토글 버튼 (모바일용) */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* 메뉴 영역 */}
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* 탭 메뉴 */}
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

            {/* 로그인/회원가입 버튼 */}
            <div className="d-flex auth-buttons">
              <ButtonComponent
                type="button"
                variant="outline"
                className="me-2"
                onClick={() => {
                  if (!isAuthenticated) {
                    console.log('Navigating to /login');
                    navigate('/login');
                  }
                }}
              >
                로그인
              </ButtonComponent>
              <ButtonComponent
                type="button"
                variant="primary"
                onClick={() => {
                  console.log('Navigating to /register');
                  navigate('/register');
                }}
              >
                회원가입
              </ButtonComponent>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
