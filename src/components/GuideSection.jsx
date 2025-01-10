import React from 'react';
import { FaCalculator, FaCommentDots, FaBell } from 'react-icons/fa';

const GuideSection = () => {
  const guides = [
    {
      icon: <FaCalculator />,
      title: '간편한 계산기',
      description: 'Select the currencies you want to convert between',
    },
    {
      icon: <FaCommentDots />,
      title: '커뮤니티 기능',
      description: 'Input the amount you want to convert',
    },
    {
      icon: <FaBell />,
      title: '알림 설정',
      description: 'Instantly see your converted amount',
    },
  ];

  return (
    <div className="site-guide">
      {guides.map((guide, index) => (
        <div key={index} className="guide-item">
          <div className="guide-icon">{guide.icon}</div>
          <h3>{guide.title}</h3>
          <p>{guide.description}</p>
        </div>
      ))}
    </div>
  );
};

export default GuideSection;
