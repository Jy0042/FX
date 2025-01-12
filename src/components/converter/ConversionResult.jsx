import React from 'react';

const ConversionResult = ({ amount, fromCurrency, toCurrency, convertedAmount }) => {
  return (
    <div className="conversion-result text-center mt-4">
      <h4 className="text-muted">
        {Number(amount).toLocaleString()} {fromCurrency} =
      </h4>
      <h2 className="text-primary fw-bold">
        {Number(convertedAmount).toLocaleString()} {toCurrency}
      </h2>
      <p className="text-muted">업데이트: 2025년 1월 13일</p>
    </div>
  );
};

export default ConversionResult;
