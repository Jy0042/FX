const ChangeData = (props) => {
  const exchange = (e) => {
    console.log('클릭', e.target.textContent);
    props.exchangeRate(e.target.textContent);
  };
  return (
    <table className="table table-light border-success table-hover">
      {/* <tbody class="table-group-divider" height={350}>
              <tr>USD/KRW</tr>
              <tr>JPY/KRW</tr>
              <tr>EUR/KRW</tr>
            </tbody> */}
      <tbody className="table-group-divider">
        <tr>
          <td className="text-center align-middle" height="110" onClick={exchange} id="1">
            USD/KRW
          </td>
        </tr>
        <tr>
          <td className="text-center align-middle" height="110" onClick={exchange} id="2">
            JPY/KRW
          </td>
        </tr>
        <tr>
          <td className="text-center align-middle" height="110" onClick={exchange} id="3">
            EUR/KRW
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ChangeData;
