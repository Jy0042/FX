import { Component, useState } from 'react';
// import { Route } from "react-router-dom";
import D3 from './chart/Chart';
import ChartJsExample from './chart/LineChart';
import { useNavigate } from 'react-router-dom';
import Apex from './chart/BarChart';
import 'bootstrap/dist/css/bootstrap.min.css';

const Body = () => {
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
    <div className="ml-auto">
      <div>
        <button onClick={changeChart}>변경</button>
        <div onClick={handleClick}>
          {/* <D3 /> */}
          <div>
            {chartState ? (
              <div className="d-flex justify-content-center align-items-center">
                {/* <D3 /> */}
                <Apex type={'bar'} />
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <Apex type={'line'} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
