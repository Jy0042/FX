import { Component, useState } from 'react';
// import { Route } from "react-router-dom";
<<<<<<< HEAD
import D3 from './chart/Chart';
import ChartJsExample from './chart/LineChart';
import { useNavigate } from 'react-router-dom';
import Apex from './chart/BarChart';
=======
import D3 from './chart/chart'
// import lineChart from '../components/linechart'
>>>>>>> 20a5e6cec8c5e6f88fe7d8b9504530efc8ab052e

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
    <div>
      <button onClick={changeChart}>변경</button>

      <div onClick={handleClick}>
        {/* <D3 /> */}
        {chartState ? (
          <div>
            {/* <D3 /> */}
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

export default Body;
