import React from 'react';

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'calculator', label: '환율 계산기' },
    { id: 'chart', label: '차트' },
    { id: 'alert', label: '알림' },
    { id: 'history', label: '변환 기록' },
  ];

  return (
    <ul className="nav nav-tabs">
      {tabs.map((tab) => (
        <li key={tab.id} className="nav-item">
          <button
            className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
