import React from 'react';

const PageLayout = ({ children }) => {
  return (
    <div className="page-layout">
      <div className="container">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
