import { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Apex from '../chart/BarChart';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div>
      <button onClick={changeChart}>변경</button>

      <div onClick={handleClick}>
        {chartState ? (
          <div>
            <Apex type={'bar'} />
          </div>
        ) : (
          <div>
            <Apex type={'line'} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartSection;
