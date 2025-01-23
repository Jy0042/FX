import React, { useState } from 'react';
import RegisterForm from '../components/forms/RegisterForm';
import ModalComponent from '../components/common/ModalComponent';
import { useNavigate } from 'react-router-dom';
import { register } from '../utils/api';

const Register = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '', onConfirm: null });
  const navigate = useNavigate();

  const showModalHandler = (title, content, onConfirm = null) => {
    setModalContent({
      title,
      body: content,
      onConfirm: onConfirm || (() => setShowModal(false)),
    });
    setShowModal(true);
  };

  const handleSubmit = async (formData) => {
    if (!formData.email || !formData.password || !formData.name) {
      showModalHandler('회원가입 실패', '모든 필드를 입력해주세요.');
      return;
    }

    const requestData = {
      email: formData.email,
      password: formData.password,
      nickname: formData.name,
    };

    try {
      const response = await register(requestData);

      showModalHandler(
        '🎉 회원가입 성공!',
        <div className="text-center">
          <p>
            👏 <strong>{formData.name}</strong> 님, 환영합니다!
          </p>
          <p>회원가입이 성공적으로 완료되었습니다. 🥳</p>
          <p>이제 사이트를 자유롭게 이용하실 수 있습니다!</p>
        </div>,
        () => {
          setShowModal(false);
          navigate('/'); // 메인 페이지로 리다이렉션
        }
      );
    } catch (error) {
      showModalHandler('회원가입 실패', error.message || '회원가입 중 문제가 발생했습니다.');
    }
  };

  const handleCancel = () => {
    showModalHandler('회원가입 취소', <p>회원가입을 취소하시겠습니까?</p>, () => {
      setShowModal(false);
      navigate('/');
    });
  };

  return (
    <div className="register-container mt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="text-center mb-4">회원가입</h1>
            <RegisterForm
              onSubmit={handleSubmit}
              showModal={showModalHandler}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </div>
      <ModalComponent
        show={showModal}
        title={modalContent.title}
        body={modalContent.body}
        onConfirm={modalContent.onConfirm}
      />
    </div>
  );
};

export default Register;
