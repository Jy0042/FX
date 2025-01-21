// LoginModal.js
import React, { useState } from 'react';
import ButtonComponent from '../common/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/api';
import useAuth from '../../hooks/useAuth';

const LoginModal = () => {
  // 로그인 상태 관리용 상태 변수
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('admin');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
  const { login } = useAuth(); // AuthContext에서 로그인 함수 가져오기

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지
    try {
      const loginData = await loginUser({ email, password, rememberMe });

      // 로그인 성공 처리
      login(loginData.userId);
      setLoginError(null); // 에러 초기화

      // 모달 닫기
      const modalElement = document.getElementById('loginModal');
      const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }

      navigate('/'); // 홈 페이지로 이동
    } catch (error) {
      setLoginError(error.message); // 로그인 실패 시 에러 메시지 설정
    }
  };

  return (
    <div
      className="modal login-modal"
      id="loginModal"
      tabIndex="-1"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static" // 백드롭 클릭 시 모달 닫히지 않도록 설정
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body position-relative">
            {/* 모달 닫기 버튼 */}
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 me-3 mt-3"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <form onSubmit={handleSubmit}>
              <div className="text-center mb-3">
                <p className="mb-2 text-lg fw-bold">로그인</p>
                <p className="text-muted">계속하려면 로그인하세요.</p>
              </div>
              {/* 로그인 에러 메시지 표시 */}
              {loginError && <p className="text-danger text-center">{loginError}</p>}
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-start d-block">
                  이메일
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-start d-block">
                  비밀번호
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label text-start d-block" htmlFor="rememberMe">
                  로그인 상태 유지
                </label>
              </div>
              <div className="text-start mb-3">
                <a href="/forgot-password" className="text-decoration-none">
                  비밀번호를 잊으셨나요?
                </a>
              </div>
              <ButtonComponent type="submit" className="btn btn-primary w-100">
                로그인
              </ButtonComponent>
            </form>
          </div>
          <div className="modal-footer">
            <p className="text-center w-100 mb-0">
              계정이 없으신가요?{' '}
              <a href="/register" className="text-primary text-decoration-none">
                회원가입
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
