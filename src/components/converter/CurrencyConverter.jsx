import React, { useState, useEffect } from 'react';
import { fetchConversionRate } from '../../utils/api';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('KRW');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getConversionRate = async () => {
      setLoading(true);
      setError(null);
      try {
        const { exchangeRate, convertedAmount } = await fetchConversionRate(
          fromCurrency,
          toCurrency,
          amount
        );
        setResult({ exchangeRate, convertedAmount });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getConversionRate();
  }, [fromCurrency, toCurrency, amount]); // 종속성 배열

  return (
    <div>
      <h1>Currency Converter</h1>
      <div>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="KRW">KRW</option>
          <option value="EUR">EUR</option>
        </select>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="KRW">KRW</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {result && (
        <div>
          <p>Exchange Rate: {result.exchangeRate}</p>
          <p>Converted Amount: {result.convertedAmount}</p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
