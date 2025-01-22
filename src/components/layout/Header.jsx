import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import ButtonComponent from '../common/ButtonComponent';
import useAuth from '../../hooks/useAuth';
import { logoutUser, getRate, readPosts } from '../../utils/api'; // 필요한 API 요청 함수 임포트
import UserMenu from '../common/UserMenu';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, userId } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser(); // 로그아웃 요청
      setIsAuthenticated(false); // 클라이언트 상태 초기화
    } catch (error) {
      alert(error.message); // 에러 메시지 표시
    }
  };

  const handleCurrencyCalculatorClick = async () => {
    try {
      // 환율 계산 API 요청
      const response = await getRate('USD', 'KRW', 100); // 예시 데이터
      console.log('환율 계산 결과:', response);
      navigate('/'); // 환율 계산기 페이지로 이동
    } catch (error) {
      console.error('환율 계산 중 오류가 발생했습니다:', error);
      alert('환율 계산을 불러오는 데 실패했습니다.');
    }
  };

  const handleCommunityClick = async () => {
    try {
      // 커뮤니티 게시글 API 요청
      const response = await readPosts(); // 게시글 목록 불러오기
      console.log('커뮤니티 게시글:', response);
      navigate('/community'); // 커뮤니티 페이지로 이동
    } catch (error) {
      console.error('커뮤니티 데이터를 불러오는 중 오류가 발생했습니다:', error);
      alert('커뮤니티를 불러오는 데 실패했습니다.');
    }
  };

  return (
    <header className="header bg-white shadow-sm">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          {/* 로고 */}
          <button
            className="navbar-brand fw-bold fs-4 btn btn-link p-0 text-decoration-none"
            onClick={() => navigate('/')}
          >
            F(X)
          </button>

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

            {/* 인증 버튼 또는 유저 메뉴 */}
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

      {/* 로그인 모달 */}
      <LoginModal />
    </header>
  );
};

export default Header;
