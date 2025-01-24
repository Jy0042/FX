import React from 'react';
import InputComponent from './InputComponent';
import CheckboxComponent from '../register/CheckboxComponent';
import termsData from '../../assets/legal/terms.json';
import privacyData from '../../assets/legal/privacy.json';

const RegisterForm = ({ onSubmit, showModal, onCancel }) => {
  const [formData, setFormData] = React.useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    terms: false,
    privacy: false,
  });

  // 폼 값 업데이트 핸들러
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // 서비스 약관 보기 모달
  const handleShowTermsModal = () => {
    showModal(
      '서비스 약관',
      <div className="modal-content-container">
        {termsData.content.map((item, index) => (
          <div key={index} className="mb-4">
            <h5 className="modal-content-heading">{item.heading}</h5>
            {item.body.split('\n').map((line, lineIndex) => (
              <p key={lineIndex} className="modal-content-body">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // 개인정보 처리방침 보기 모달
  const handleShowPrivacyModal = () => {
    showModal(
      '개인정보 처리방침',
      <div className="modal-content-container">
        {privacyData.content.map((item, index) => (
          <div key={index} className="mb-4">
            <h5 className="modal-content-heading">{item.heading}</h5>
            {item.body.split('\n').map((line, lineIndex) => (
              <p key={lineIndex} className="modal-content-body">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputComponent
        id="email-input"
        name="email"
        label="이메일"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="이메일을 입력하세요"
        required
      />
      <InputComponent
        id="name-input"
        name="name"
        label="별명"
        value={formData.name}
        onChange={handleChange}
        placeholder="닉네임을 입력하세요"
        required
      />
      <InputComponent
        id="password-input"
        name="password"
        label="비밀번호"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="비밀번호를 입력하세요"
        required
      />
      <InputComponent
        id="confirm-password-input"
        name="confirmPassword"
        label="비밀번호 확인"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="비밀번호를 다시 입력하세요"
        required
      />
      <CheckboxComponent
        id="terms-checkbox"
        name="terms"
        label={<span>(필수) 서비스 이용약관에 동의합니다.</span>}
        checked={formData.terms}
        onChange={handleChange}
        onViewDetails={handleShowTermsModal}
        viewButtonText="서비스 약관 보기"
      />
      <CheckboxComponent
        id="privacy-checkbox"
        name="privacy"
        label={<span>(필수) 개인정보 처리방침에 동의합니다.</span>}
        checked={formData.privacy}
        onChange={handleChange}
        onViewDetails={handleShowPrivacyModal}
        viewButtonText="개인정보 처리방침 보기"
      />
      <div className="row">
        <div className="col-12 mb-2">
          <button type="submit" className="btn btn-primary w-100">
            회원가입 완료
          </button>
        </div>
        <div className="col-12">
          <button type="button" className="btn btn-secondary w-100" onClick={onCancel}>
            회원가입 취소
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
