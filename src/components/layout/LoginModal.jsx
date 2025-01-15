import React, { useState } from 'react';
import { loginUser } from '../../utils/api';
import ButtonComponent from '../common/ButtonComponent'; // 커스텀 버튼 컴포넌트 가져오기

const LoginModal = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser({ email, password, rememberMe });
      onLogin(loginData); // 로그인 성공 데이터 전달
      alert('로그인 성공!');
    } catch (error) {
      alert(error.message); // 에러 메시지 표시
    }
  };

  return (
    <div
      className="modal"
      id="loginModal"
      tabIndex="-1"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
      data-bs-backdrop="false" // 백드롭 제거
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* 헤더 */}
          <div className="modal-header">
            <h5 className="modal-title" id="loginModalLabel">
              로그인
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* 바디 */}
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="text-center mb-3">
                <p className="mb-2 text-lg fw-bold">로그인</p>
                <p className="text-muted">계속하려면 로그인하세요.</p>
              </div>

              {/* 이메일 입력 */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  이메일
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="example@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* 비밀번호 입력 */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  비밀번호
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* 로그인 상태 유지 체크박스 */}
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  로그인 상태 유지
                </label>
              </div>

              {/* 패스워드 찾기 */}
              <div className="text-end mb-3">
                <a href="/forgot-password" className="text-decoration-none text-primary">
                  비밀번호를 잊으셨나요?
                </a>
              </div>

              {/* 로그인 버튼 */}
              <ButtonComponent type="submit" className="btn btn-primary w-100">
                로그인
              </ButtonComponent>
            </form>
          </div>

          {/* 푸터 */}
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
