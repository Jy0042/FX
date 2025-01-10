import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
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
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* 메뉴 */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  환율 계산기
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/community">
                  커뮤니티
                </Link>
              </li>
            </ul>
          </div>

          {/* 로그인/회원가입 버튼 */}
          <div className="d-flex auth-buttons">
            <button className="btn btn-outline-primary me-2">로그인</button>
            <button className="btn btn-primary">회원가입</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
