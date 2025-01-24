import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Apex from '../chart/Chart';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChangeData from '../chart/ChangeData';

const ChartSection = () => {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState('USD/KRW'); // 초기 환율값

  // 환율 변경 핸들러
  const handleExchangeRateChange = (newCurrency) => {
    console.log('변경할 환율:', newCurrency);
    setCurrency(newCurrency);
  };

  // 차트 클릭 핸들러
  const handleChartClick = () => {
    navigate(`/chart?currency=${currency}`);
  };

  return (
    <div className="container chart-container">
      <div className="text-center mb-4">
        <h1 className="fw-bold mb-4">맞춤형 인기 환율 순위</h1>
        <h3 className="text-muted fs-5 mb-5">현재 가장 인기 있는 환율 정보를 확인하세요</h3>
      </div>
      <div className="row">
        <div className="col-md-3">
          <ChangeData exchangeRate={handleExchangeRateChange} />
        </div>
        <div className="col-md-9" onClick={handleChartClick} style={{ cursor: 'pointer' }}>
          <Apex type="line" currency={currency} />
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
