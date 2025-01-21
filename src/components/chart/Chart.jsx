import ReactApexChart from 'react-apexcharts';
import { readChartData } from '../../utils/api';
import { useState, useEffect } from 'react';

const Apex = ({ type, currency }) => {
  const [exchange, setExchange] = useState([]);
  console.log('Apex차트 내부 props : ', currency);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await readChartData(currency);
        setExchange(res);
        console.log('환율데이터', res);
        // console.log('items: ', exchange);
        if (!res) {
          throw new Error('Failed to fetch posts');
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [currency]);

  const reducedExchange = exchange.filter((_, index) => index % 20 === 0);
  //다운 샘플링

  const chartOptions = {
    xaxis: {
      categories: reducedExchange.map((items) => items.date),
    },
    title: {
      text: currency,
    },
    chart: {
      animations: {
        enabled: false, // Disable animations for faster rendering
      },
    },
    markers: {
      size: 0, // Remove markers on data points
    },
  };
  console.log('chartOptions', chartOptions.title.text);

  const data = [
    {
      name: chartOptions.title.text,
      data: reducedExchange.map((items) => parseInt(items.fx_rate)),
    },
  ];

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={data}
        type={type}
        height={350}
        // key={type}
      />
    </div>
  );
};

export default Apex;
