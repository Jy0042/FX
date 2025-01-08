import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';

// ReactApexChart.propTypes = {
//   type: PropTypes.string.isRequired,
//   series: PropTypes.array.isRequired,
//   options: PropTypes.object.isRequired,
//   width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
// };

const Apex = ({ type }) => {
  console.log('type: ', type);
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
    <div>
      {/* <h2>Bar Chart</h2>
      <ReactApexChart options={chartOptions} series={data} type="bar" height={350} />

      <h2>Line Chart</h2>
      <ReactApexChart options={chartOptions} series={data} type="line" height={350} /> */}
      <ReactApexChart options={chartOptions} series={data} type={type} height={350} key={type} />
    </div>
  );
};

export default Apex;
