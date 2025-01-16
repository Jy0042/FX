import React, { useState } from 'react';
import ButtonComponent from '../components/common/ButtonComponent';
import ModalComponent from '../components/common/ModalComponent';
import { useNavigate } from 'react-router-dom';
import { register } from '../utils/api';
import '../styles/app.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    terms: false,
    privacy: false,
  });

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '', onConfirm: null });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (formData.password !== formData.confirmPassword) {
      setModalContent({
        title: '비밀번호 오류',
        body: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
      });
      setShowModal(true);
      return;
    }

    // 약관 확인
    if (!formData.terms || !formData.privacy) {
      setModalContent({
        title: '약관 동의 필요',
        body: '약관 및 개인정보 처리방침에 동의해야 회원가입이 가능합니다.',
      });
      setShowModal(true);
      return;
    }

    // 회원가입 요청
    try {
      const userData = {
        email: formData.email,
        password: formData.password,
        nickname: formData.name,
      };
      const response = await register(userData);

      setModalContent({
        title: '회원가입 성공',
        body: response.message || '회원가입이 완료되었습니다.',
        onConfirm: () => navigate('/'),
      });
      setShowModal(true);
    } catch (error) {
      setModalContent({
        title: '회원가입 실패',
        body:
          error.response?.data?.message ||
          '회원가입 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
      setShowModal(true);
    }
  };

  const handleCancel = () => {
    setModalContent({
      title: '회원가입 취소',
      body: '정말로 회원가입을 취소하시겠습니까?',
      onConfirm: () => navigate('/'),
    });
    setShowModal(true);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">회원가입</h2>
          <form onSubmit={handleSubmit}>
            {/* 이메일 */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold text-start d-block">
                이메일
              </label>
              <div className="input-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control shadow-sm"
                  placeholder="example@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="btn btn-outline-secondary ms-2">
                  인증 메일 발송
                </button>
              </div>
            </div>

            {/* 이름 */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold text-start d-block">
                별명
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control shadow-sm"
                placeholder="닉네임을 입력하세요"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* 비밀번호 */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold text-start d-block">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control shadow-sm"
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* 비밀번호 확인 */}
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label fw-bold text-start d-block">
                비밀번호 확인
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control shadow-sm"
                placeholder="비밀번호를 다시 입력하세요"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* 약관 */}
            <div className="form-check mb-3 text-start">
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
                (필수) 약관에 동의합니다.{' '}
                <span
                  className="text-primary text-decoration-underline"
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    setModalContent({
                      title: '이용약관',
                      body: '이용약관 내용을 여기에 추가합니다.',
                      onConfirm: null,
                    }) || setShowModal(true)
                  }
                >
                  [이용약관 보기]
                </span>
              </label>
            </div>

            {/* 개인정보 */}
            <div className="form-check mb-4 text-start">
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
                (필수) 개인정보 처리방침에 동의합니다.{' '}
                <span
                  className="text-primary text-decoration-underline"
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    setModalContent({
                      title: '개인정보 처리방침',
                      body: '개인정보 처리방침 내용을 여기에 추가합니다.',
                      onConfirm: null,
                    }) || setShowModal(true)
                  }
                >
                  [개인정보 보기]
                </span>
              </label>
            </div>

            {/* 버튼 */}
            <div className="d-flex justify-content-between">
              <ButtonComponent type="submit" className="btn btn-primary w-48">
                회원가입 완료
              </ButtonComponent>
              <ButtonComponent
                type="button"
                className="btn btn-outline-light w-48"
                onClick={handleCancel}
              >
                회원가입 취소
              </ButtonComponent>
            </div>
          </form>
        </div>
      </div>

      {/* 모달 */}
      <ModalComponent
        show={showModal}
        title={modalContent.title}
        body={modalContent.body}
        onClose={() => setShowModal(false)}
        onConfirm={modalContent.onConfirm}
      />
    </div>
  );
};

export default Register;
