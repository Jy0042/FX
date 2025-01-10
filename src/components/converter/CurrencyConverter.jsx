import React, { useState } from 'react';
import CurrencyInput from './CurrencyInput';
import ConversionResult from './ConversionResult';
import SwapButton from './SwapButton';
import Tabs from './Tabs';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('KRW');
  const [exchangeRate, setExchangeRate] = useState(1.22); // 예제 데이터

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Currency Converter</h1>
      <Tabs />
      <div className="card p-4 shadow-sm">
        <div className="row g-3 align-items-center">
          <CurrencyInput
            amount={amount}
            setAmount={setAmount}
            fromCurrency={fromCurrency}
            setFromCurrency={setFromCurrency}
            toCurrency={toCurrency}
            setToCurrency={setToCurrency}
          />
          <div className="col-12 text-center">
            <SwapButton onClick={handleSwap} />
          </div>
        </div>
        <ConversionResult
          amount={amount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          exchangeRate={exchangeRate}
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;
