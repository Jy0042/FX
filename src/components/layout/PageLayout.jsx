import React from 'react';

const PageLayout = ({ children }) => {
  return (
    <div className="page-layout">
      <div className="container">
        {/* PageLayout은 일반 페이지에서 컨텐츠만 표시 */}
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
