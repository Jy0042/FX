import { useState, useEffect } from 'react';
import { readChartData } from '../../utils/api';

const Table = () => {
  const [exchange, setExchange] = useState([]);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState('');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await readChartData();
  //       setExchange(res);
  //       console.log('환율데이터', res[0].fx_rate);
  //       // console.log('items: ', exchange);
  //       if (!res) {
  //         throw new Error('Failed to fetch posts');
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   console.log('Updated exchange data:', exchange);
  // }, [exchange]); // exchange 상태가 업데이트될 때 실행

  const headers = [
    {
      text: 'From',
      value: 'source_currency_code',
    },
    {
      text: 'To',
      value: 'target_currency_code',
    },
    {
      text: 'Exchange Rate',
      value: 'fx_rate',
    },
    {
      text: 'Date',
      value: 'date',
    },
  ];

  // const items = exchange;

  return (
    <div className="container mt-4">
      <table className="table table-light table-bordered border-success table-hover">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.text}>
                {header.text} {/* 컬럼명 바인딩 */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {exchange.map((item, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header.value}>{item[header.value]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
