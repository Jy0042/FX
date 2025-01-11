import React from 'react';
import CurrencyConverter from '../converter/CurrencyConverter';
import GuideSection from './GuideSection';

const MainLayout = ({ children }) => {
  return (
    <div>
      {/* CurrencyConverter는 메인 레이아웃에서만 표시 */}
      <CurrencyConverter />
      {children}
      <GuideSection />
    </div>
  );
};

export default MainLayout;
