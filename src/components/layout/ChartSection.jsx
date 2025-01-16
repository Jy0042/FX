import { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Apex from '../chart/Chart';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChangeData from '../chart/ChangeData';
const ChartSection = () => {
  const [chartState, setChartState] = useState(true);
  const navigate = useNavigate();

  const changeChart = () => {
    console.log(chartState);
    setChartState(!chartState);
  };

  const handleClick = () => {
    navigate(`/chart`); // 게시물 ID를 포함한 경로로 이동
    console.log();
  };

  return (
    <div className="container">
      <button onClick={changeChart}>변경</button>
      <h1 className="card-title text-start mb-2">맞춤형 인기 환율 순위</h1>
      <div className="row">
        <div className="col-md-3">
          <ChangeData />
        </div>
        <div onClick={handleClick} className="col-md-9">
          {chartState ? (
            <div>
              <Apex type={'line'} />
            </div>
          ) : (
            <div>
              <Apex type={'bar'} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
