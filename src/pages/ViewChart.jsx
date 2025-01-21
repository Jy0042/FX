import { useState } from 'react';
import Apex from '../components/chart/Chart';
import Table from '../components/chart/Table';

const ViewChart = () => {
  const [chartState, setChartState] = useState(true);

  const changeChart = () => {
    console.log(chartState);
    setChartState(!chartState);
  };
  return (
    <div>
      <h1>그래프 상세 페이지</h1>
      <button onClick={changeChart}>변경</button>
      {chartState ? (
        <div>
          <Apex type={'line'} />
        </div>
      ) : (
        <div>
          <Apex type={'bar'} />
        </div>
      )}
      {/* <Apex/> */}
      <div>
        <Table />
      </div>
    </div>
  );
};

export default ViewChart;
