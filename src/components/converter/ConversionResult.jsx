import React from 'react';

const ConversionResult = ({ amount, fromCurrency, toCurrency, exchangeRate }) => {
  const convertedAmount = (amount * exchangeRate).toFixed(2);

  return (
    <div className="conversion-result text-center mt-4">
      <h4 className="text-muted">
        {amount.toLocaleString()} {fromCurrency} =
      </h4>
      <h2 className="text-primary fw-bold">
        {convertedAmount} {toCurrency}
      </h2>
      <p className="text-muted">
        1 {fromCurrency} = {(1 * exchangeRate).toFixed(6)} {toCurrency} <br />1 {toCurrency} ={' '}
        {(1 / exchangeRate).toFixed(6)} {fromCurrency}
      </p>
      <p className="text-muted">Last updated: Jan 2, 2025, 12:46 UTC</p>
    </div>
  );
};

export default ConversionResult;
