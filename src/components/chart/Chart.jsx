import ReactApexChart from 'react-apexcharts';
// import { useNavigate } from 'react-router-dom';
import { readChartData } from '../../utils/api';
import { useState, useEffect } from 'react';

const Apex = ({ type }) => {
  // const navigate = useNavigate();
  const [exchange, setExchange] = useState([]);
  // const [fxEx, setfxEx] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await readChartData();
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
  }, []);

  const reducedExchange = exchange.filter((_, index) => index % 10 === 0);

  const chartOptions = {
    xaxis: {
      categories: reducedExchange.map((items) => items.date),
    },
    title: {
      text: 'USD/KRW',
    },
  };

  const data = [
    {
      name: 'Sales',
      data: reducedExchange.map((items) => parseInt(items.fx_rate)),
    },
  ];

  // const handleClick = () => {
  //   navigate(`/chart`); // 게시물 ID를 포함한 경로로 이동
  //   console.log();
  // };

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
