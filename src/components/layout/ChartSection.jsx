import { Component, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Apex from '../chart/Chart';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChangeData from '../chart/ChangeData';

const ChartSection = () => {
  const navigate = useNavigate();

  const [currency, setCurrency] = useState('USD/KRW'); //초기 환율값 USD/KRW

  const handleClick = () => {
    navigate(`/chart?currency=${currency}`); // 게시물 ID를 포함한 경로로 이동
    console.log();
  };

  const exchangeRate = (text) => {
    console.log('변경할 환율(상위컴포넌트):', text);
    setCurrency(text);
  };

  return (
    <div className="container">
      <h1 className="card-title text-start mt-4 mb-4">맞춤형 인기 환율 순위</h1>
      <div className="row">
        <div className="col-md-3">
          <ChangeData exchangeRate={exchangeRate} />
        </div>
        <div onClick={handleClick} className="col-md-9">
          <Apex type={'line'} currency={currency} />
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
