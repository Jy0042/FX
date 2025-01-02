import React from "react";

const Tabs = () => {
  const tabs = ["계산기", "차트", "알림"];

  return (
    <ul className="nav nav-tabs">
      {tabs.map((tab, index) => (
        <li key={index} className="nav-item">
          <button className={`nav-link ${index === 0 ? "active" : ""}`}>{tab}</button>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
