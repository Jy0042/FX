import React from 'react';
import CurrencyConverter from '../converter/CurrencyConverter';
import GuideSection from './GuideSection';

const MainLayout = ({ children }) => {
  return (
    <div>
      <CurrencyConverter />
      {children}
      <GuideSection />
    </div>
  );
};

export default MainLayout;
