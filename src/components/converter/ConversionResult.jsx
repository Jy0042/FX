import React from 'react';

const ConversionResult = ({ amount, fromCurrency, toCurrency, convertedAmount }) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="mt-3">
      <p className="text-black fs-5 mb-1">
        <strong>{Number(amount).toLocaleString()}</strong> {fromCurrency} =
      </p>
      <h2 className="text-primary fw-bold mb-3">
        {Number(convertedAmount).toLocaleString()} {toCurrency}
      </h2>
      <div className="text-secondary">
        <p className="mb-1 fs-7">
          1 {fromCurrency} = <strong>{(convertedAmount / amount).toFixed(6)}</strong> {toCurrency}
        </p>
        <p className="fs-7">
          1 {toCurrency} = <strong>{(amount / convertedAmount).toFixed(2)}</strong> {fromCurrency}
        </p>
        <p className="text-muted fs-7 text-end">
          <small>마지막 업데이트: {formattedDate}</small>
        </p>
      </div>
    </div>
  );
};

export default ConversionResult;
