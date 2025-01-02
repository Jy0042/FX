import React from "react";

const CurrencyInput = ({
  amount,
  setAmount,
  fromCurrency,
  setFromCurrency,
  toCurrency,
  setToCurrency,
}) => {
  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleFromCurrencyChange = (e) => setFromCurrency(e.target.value);
  const handleToCurrencyChange = (e) => setToCurrency(e.target.value);

  return (
    <div className="row g-3 align-items-center">
      <div className="col-md-4">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          className="form-control"
          value={amount}
          onChange={handleAmountChange}
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
          onChange={handleFromCurrencyChange}
        >
          <option value="KRW">KRW - South Korean Won</option>
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
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
          onChange={handleToCurrencyChange}
        >
          <option value="USD">USD - US Dollar</option>
          <option value="KRW">KRW - South Korean Won</option>
          <option value="EUR">EUR - Euro</option>
        </select>
      </div>
    </div>
  );
};

export default CurrencyInput;
