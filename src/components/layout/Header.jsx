import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import ButtonComponent from '../common/ButtonComponent';
import useAuth from '../../hooks/useAuth';
import { getRate, readPosts } from '../../utils/api';
import UserMenu from '../common/UserMenu';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, userId, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    console.log('로그아웃 시작');
    try {
      await logout();
      console.log('클라이언트 상태 초기화 완료');
      navigate('/'); // 로그아웃 후 홈으로 이동
    } catch (error) {
      console.error('로그아웃 처리 중 오류:', error.message);
    }
  };

  const handleCurrencyCalculatorClick = async () => {
    try {
      const response = await getRate('USD', 'KRW', 100);
      console.log('환율 계산 결과:', response);
      navigate('/');
    } catch (error) {
      console.error('환율 계산 중 오류가 발생했습니다:', error);
      alert('환율 계산을 불러오는 데 실패했습니다.');
    }
  };

  const handleCommunityClick = async () => {
    try {
      const response = await readPosts();
      console.log('커뮤니티 게시글:', response);
      navigate('/community');
    } catch (error) {
      console.error('커뮤니티 데이터를 불러오는 중 오류가 발생했습니다:', error);
      alert('커뮤니티를 불러오는 데 실패했습니다.');
    }
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
            onClick={() => navigate('/')}
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
                  onClick={handleCurrencyCalculatorClick}
                >
                  환율 계산기
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link ${
                    location.pathname === '/community' ? 'active fw-bold' : ''
                  }`}
                  onClick={handleCommunityClick}
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
                    onClick={() => navigate('/register')}
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
