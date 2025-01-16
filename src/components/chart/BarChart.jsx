import ReactApexChart from 'react-apexcharts';

const Apex = ({ type }) => {
  // console.log('type: ', type);
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

  return (
    <div className="container">
      <ReactApexChart options={chartOptions} series={data} type={type} height={350} key={type} />
    </div>
  );
};

export default Apex;
