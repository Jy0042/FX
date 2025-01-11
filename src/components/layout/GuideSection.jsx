import React from 'react';
import { FaCalculator, FaCommentDots, FaBell } from 'react-icons/fa';

const GuideSection = () => {
  const guides = [
    {
      icon: <FaCalculator />,
      title: '간편한 계산기',
      description: '원하는 환율을 선택하고 간단히 계산하세요.',
    },
    {
      icon: <FaCommentDots />,
      title: '커뮤니티 기능',
      description: '다른 사용자와 정보를 공유하고 소통하세요.',
    },
    {
      icon: <FaBell />,
      title: '알림 설정',
      description: '환율 변화 알림을 받아보세요.',
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4">사이트 이용 가이드</h2>
      <div className="row justify-content-center">
        {guides.map((guide, index) => (
          <div
            key={index}
            className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center"
          >
            <div
              className="d-flex flex-column align-items-start shadow-sm p-4"
              style={{
                borderRadius: '12px',
                background: '#fff',
                width: '100%',
                maxWidth: '360px',
                minHeight: '160px',
                border: '1px solid #e9ecef',
              }}
            >
              <div className="d-flex align-items-center mb-3" style={{ width: '100%' }}>
                <div
                  style={{
                    fontSize: '2rem',
                    color: '#0056b3',
                    marginRight: '16px',
                  }}
                >
                  {guide.icon}
                </div>
                <h5 className="fw-bold mb-0" style={{ color: '#212529' }}>
                  {guide.title}
                </h5>
              </div>
              <p className="text-muted mb-0" style={{ lineHeight: '1.5', fontSize: '0.95rem' }}>
                {guide.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideSection;
