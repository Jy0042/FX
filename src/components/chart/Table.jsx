const Table = ({ exchangeData }) => {
  console.log('Table에서의 currency: ', exchangeData);

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

  const sortedData = [...exchangeData].sort((a, b) => new Date(b.date) - new Date(a.date));
  const limitedData = sortedData.slice(0, 20);

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
          {limitedData.map((item, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header.value}>
                  {item[header.value].length > 10
                    ? item[header.value].slice(0, 10)
                    : item[header.value]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
