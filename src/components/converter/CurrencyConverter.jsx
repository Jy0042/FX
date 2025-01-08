import React, { useState } from 'react';
import Tabs from './Tabs';
import CurrencyInput from './CurrencyInput';
import ConversionResult from './ConversionResult';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1); // 초기 금액
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('KRW');
  const [exchangeRate, setExchangeRate] = useState(0.000681); // 예제 환율

  return (
    <div className="currency-converter">
      <h1 className="text-center mb-4">Currency Converter</h1>
      <Tabs />
      <div className="mt-4 px-3">
        <CurrencyInput
          amount={amount}
          setAmount={setAmount}
          fromCurrency={fromCurrency}
          setFromCurrency={setFromCurrency}
          toCurrency={toCurrency}
          setToCurrency={setToCurrency}
        />
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
