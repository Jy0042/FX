import React from 'react';
import {
  FaCalculator,
  FaCommentDots,
  FaBell,
  FaChartLine,
  FaSearchDollar,
  FaUsers,
} from 'react-icons/fa';

const GuideSection = () => {
  const guides = [
    {
      icon: <FaCalculator />,
      title: '간편한 계산기',
      description: '원하는 환율을 선택하고 간단히 계산하세요.',
      detail: '빠르고 정확한 환율 계산으로, 복잡한 과정 없이 필요한 정보를 바로 확인하세요.',
    },
    {
      icon: <FaCommentDots />,
      title: '커뮤니티 기능',
      description: '다른 사용자와 정보를 공유하고 소통하세요.',
      detail: '환율 정보뿐만 아니라 경험과 팁을 공유하며 유익한 대화를 나눌 수 있습니다.',
    },
    {
      icon: <FaBell />,
      title: '알림 설정',
      description: '환율 변화 알림을 받아보세요.',
      detail: '중요한 환율 변화를 놓치지 않도록 실시간 알림을 받아보세요.',
    },
    {
      icon: <FaChartLine />,
      title: '환율 차트 보기',
      description: '환율 변동 추이를 시각적으로 확인하세요.',
      detail: '사용자 지정 기간 동안의 환율 변동을 그래프로 확인하여 트렌드를 분석할 수 있습니다.',
    },
    {
      icon: <FaSearchDollar />,
      title: '환율 검색 기능',
      description: '다양한 국가의 환율을 즉시 검색하세요.',
      detail: '빠르고 직관적인 검색으로 관심 있는 국가 간 환율 정보를 손쉽게 확인할 수 있습니다.',
    },
    {
      icon: <FaUsers />,
      title: '사용자 관리 기능',
      description: '계정 정보를 관리하고 설정을 변경하세요.',
      detail: '사용자 계정 정보를 업데이트하고 개인화된 서비스를 경험해보세요.',
    },
  ];

  return (
    <div className="container guide-container my-5">
      <h2 className="text-center fw-bold mb-4">사이트 이용 가이드</h2>
      <h3 className="text-center text-muted fs-5 mb-5">
        유용한 기능으로 편리하게 사이트를 이용하세요
      </h3>
      <div className="row justify-content-center">
        {guides.map((guide, index) => (
          <div
            key={index}
            className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center"
          >
            <div className="guide-card shadow-sm p-4 d-flex flex-column justify-content-center align-items-center text-center">
              <div className="guide-icon mb-3">{guide.icon}</div>
              <h5 className="fw-bold mb-3 text-dark">{guide.title}</h5>
              <p className="text-muted mb-2">{guide.description}</p>
              <p className="text-muted">{guide.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideSection;
