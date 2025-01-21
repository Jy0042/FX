import React from 'react';
import Converter from '../converter/Converter';
import GuideSection from './GuideSection';

const MainLayout = ({ children }) => {
  return (
    <div>
      <Converter />
      {children}
      <GuideSection />
    </div>
  );
};

export default MainLayout;
