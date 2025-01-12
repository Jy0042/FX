// CurrencyInput.js
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
    <div className="row mb-4">
      <div className="col-md-4">
        <label htmlFor="amount" className="form-label">
          금액
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
          출발 통화
        </label>
        <select
          id="fromCurrency"
          className="form-select"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          <option value="USD">미국 달러 (USD)</option>
          <option value="KRW">한국 원 (KRW)</option>
          <option value="EUR">유로 (EUR)</option>
        </select>
      </div>
      <div className="col-md-4">
        <label htmlFor="toCurrency" className="form-label">
          도착 통화
        </label>
        <select
          id="toCurrency"
          className="form-select"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          <option value="USD">미국 달러 (USD)</option>
          <option value="KRW">한국 원 (KRW)</option>
          <option value="EUR">유로 (EUR)</option>
        </select>
      </div>
    </div>
  );
};

export default CurrencyInput;
