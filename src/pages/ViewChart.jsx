import { useState } from 'react';

import D3 from '../components/chart/Chart';
import Apex from '../components/chart/BarChart';
// import Table from '../components/chart/Table';

const ViewChart = () => {
  return (
    <div>
      <h1>그래프 상세 페이지</h1>
      <Apex />
      {/* <Table /> */}
    </div>
  );
};

export default ViewChart;
