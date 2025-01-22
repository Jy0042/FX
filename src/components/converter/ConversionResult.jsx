import React from 'react';

const ConversionResult = ({ amount, fromCurrency, toCurrency, convertedAmount }) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();

  return (
    <div className="conversion-result text-center mt-4">
      <h4 className="text-muted">
        {Number(amount).toLocaleString()} {fromCurrency} =
      </h4>
      <h2 className="text-primary fw-bold">
        {Number(convertedAmount).toLocaleString()} {toCurrency}
      </h2>
      <p className="text-muted">업데이트: {formattedDate}</p>
    </div>
  );
};

export default ConversionResult;
