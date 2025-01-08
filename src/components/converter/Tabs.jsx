import React from 'react';

const Tabs = () => {
  const tabs = ['Calculator', 'Chart', 'Alerts'];

  return (
    <ul className="nav nav-tabs mb-4">
      {tabs.map((tab, index) => (
        <li key={index} className="nav-item">
          <button className={`nav-link ${index === 0 ? 'active' : ''}`}>{tab}</button>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
