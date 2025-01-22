import ReactApexChart from 'react-apexcharts';
import { readChartData } from '../../utils/api';
import { useState, useEffect, useRef } from 'react';

const Apex = ({ type, currency }) => {
  const [exchange, setExchange] = useState([]);
  const isFetching = useRef(false); // 중복 호출 방지 플래그
  console.log('Apex차트 내부 props : ', currency);

  useEffect(() => {
    const fetchData = async () => {
      if (isFetching.current) return; // 이미 로드 중이면 실행하지 않음
      isFetching.current = true;

      try {
        console.log('변경할 currency:', currency);
        const res = await readChartData(currency);

        if (!res || res.length === 0) {
          throw new Error('Invalid data received from API');
        }

        setExchange(res);
        console.log('환율데이터', res);
      } catch (error) {
        console.error('데이터 로드 오류:', error.message);
      } finally {
        isFetching.current = false; // 로드 상태 해제
      }
    };

    fetchData();
  }, [currency]);

  // 다운 샘플링
  // const reducedExchange = exchange.filter((_, index) => index % 20 === 0);
  const sampleXData = exchange.map((items) => items.date.slice(0, 10));
  console.log('일자만 : ', sampleXData);

  const reducedExchange = exchange.reduce((acc, item) => {
    const yearMonth = item.date.slice(0, 7); // Extract "YYYY-MM" from the date
    if (!acc[yearMonth]) {
      acc[yearMonth] = item; // Add the first entry of each month
    }
    return acc;
  }, {});

  // const filteredExchange = Object.values(reducedExchange);

  // 차트 옵션
  const chartOptions = {
    xaxis: {
      categories: sampleXData,
      type: 'datetime',
    },

    title: {
      text: currency,
    },
    chart: {
      animations: {
        enabled: false, // 애니메이션 비활성화
      },
    },
    markers: {
      size: 0, // 데이터 포인트 표시 제거
    },
    stroke: {
      curve: 'straight',
    },
  };

  console.log('chartOptions', chartOptions.title.text);

  const data = [
    {
      name: chartOptions.title.text,
      data: exchange.map((items) => parseInt(items.fx_rate, 10)), // 정수 변환
    },
  ];

  return (
    <div>
      <ReactApexChart options={chartOptions} series={data} type={type} height={350} />
    </div>
  );
};

export default Apex;
