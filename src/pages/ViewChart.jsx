import { useState } from 'react';
import Apex from '../components/chart/BarChart';
// import Table from '../components/chart/Table';

const ViewChart = () => {
  return (
    <div>
      <ul>
        <h1>그래프 상세 페이지</h1>
        <Apex />
        {/* <Table /> */}
      </ul>
    </div>
  );
};

export default ViewChart;
