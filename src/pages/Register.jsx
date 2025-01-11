import React, { useState } from 'react';
import './SignUp.css'; // 스타일 파일 연결

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
    name: '',
    password: '',
    confirmPassword: '',
    terms: false,
    privacy: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    if (!formData.terms || !formData.privacy) {
      alert('You must agree to all terms.');
      return;
    }
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="signup-container">
      <h2 className="text-center">회원가입</h2>
      <form onSubmit={handleSubmit}>
        {/* 이메일 */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            이메일
          </label>
          <div className="d-flex">
            <input
              type="email"
              id="email"
              name="email"
              className="form-control me-2"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <button type="button" className="btn btn-dark">
              인증 메일 발송
            </button>
          </div>
        </div>

        {/* 인증 코드 확인 */}
        <div className="mb-3">
          <label htmlFor="verificationCode" className="form-label">
            이메일 인증 코드 확인
          </label>
          <input
            type="text"
            id="verificationCode"
            name="verificationCode"
            className="form-control"
            value={formData.verificationCode}
            onChange={handleChange}
            required
          />
        </div>

        {/* 이름 */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            별명
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* 비밀번호 */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            비밀번호 확인
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* 약관 */}
        <div className="form-check mb-2">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            className="form-check-input"
            checked={formData.terms}
            onChange={handleChange}
            required
          />
          <label htmlFor="terms" className="form-check-label">
            (필수) 약관을 모두 읽고 동의합니다. <a href="/">이용약관</a>
          </label>
        </div>

        {/* 개인정보 */}
        <div className="form-check mb-4">
          <input
            type="checkbox"
            id="privacy"
            name="privacy"
            className="form-check-input"
            checked={formData.privacy}
            onChange={handleChange}
            required
          />
          <label htmlFor="privacy" className="form-check-label">
            (필수) 개인정보 수집 · 이용에 동의합니다. <a href="/">개인정보 처리방침</a>
          </label>
        </div>

        {/* 제출 버튼 */}
        <div className="text-center">
          <button type="submit" className="btn btn-dark w-100">
            회원가입 완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
