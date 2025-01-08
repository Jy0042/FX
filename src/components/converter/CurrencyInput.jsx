import React from 'react';

const CurrencyInput = ({
  amount,
  setAmount,
  fromCurrency,
  setFromCurrency,
  toCurrency,
  setToCurrency,
}) => {
  return (
    <>
      <div className="col-md-4">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="col-md-4">
        <label htmlFor="fromCurrency" className="form-label">
          From
        </label>
        <select
          id="fromCurrency"
          className="form-select"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="KRW">KRW - South Korean Won</option>
        </select>
      </div>
      <div className="col-md-4">
        <label htmlFor="toCurrency" className="form-label">
          To
        </label>
        <select
          id="toCurrency"
          className="form-select"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="KRW">KRW - South Korean Won</option>
        </select>
      </div>
    </>
  );
};

export default CurrencyInput;
