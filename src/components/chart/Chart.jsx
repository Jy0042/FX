import ReactApexChart from 'react-apexcharts';
// import { useNavigate } from 'react-router-dom';

const Apex = ({ type }) => {
  // console.log('type: ', type);
  // const navigate = useNavigate();
  const chartOptions = {
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    title: {
      text: 'Monthly Sales',
    },
  };

  const data = [
    {
      name: 'Sales',
      data: [30, 40, 35, 50, 49, 60],
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
