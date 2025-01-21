import { useState, useEffect } from 'react';
import Apex from '../components/chart/Chart';
import Table from '../components/chart/Table';
import { useLocation } from 'react-router-dom';

const ViewChart = () => {
  const [chartState, setChartState] = useState(true);
  const location = useLocation();
  const [currency, setCurrency] = useState('USD/KRW'); //초기 환율값 USD/KRW

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialCurrency = params.get('currency');
    if (initialCurrency) {
      setCurrency(initialCurrency); // Set currency from URL
    }
    console.log('params:', params);
    console.log('initialCurrency:', initialCurrency);
  }, [location.search]);

  const changeChart = () => {
    console.log(chartState);
    setChartState(!chartState);
  };
  return (
    <div>
      <h1>그래프 상세 페이지</h1>
      <button className="d-flex content-align-end" onClick={changeChart}>
        변경
      </button>
      <button>Default</button>
      <button>1Y</button>
      <button>6M</button>
      <button>30D</button>
      {chartState ? (
        <div>
          <Apex type={'line'} currency={currency} />
        </div>
      ) : (
        <div>
          <Apex type={'bar'} />
        </div>
      )}
      <div>
        <Table />
      </div>
    </div>
  );
};

export default ViewChart;
