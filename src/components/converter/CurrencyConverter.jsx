import React, { useState } from 'react';
import CurrencyInput from './CurrencyInput';
import SwapButton from './SwapButton';
import ConversionResult from './ConversionResult';
import Tabs from './Tabs';
import { getRate } from '../../utils/api';

const Converter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('KRW');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleConvert = async () => {
    try {
      setError(null); // 이전 오류 초기화
      setResult(null); // 이전 결과 초기화
      const { convertedAmount, targetCurrency } = await getRate(fromCurrency, toCurrency, amount);
      setResult({ convertedAmount, targetCurrency });
    } catch (err) {
      setError(err.message); // 오류 메시지 설정
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">환율 계산기</h1>
      <Tabs />
      <div className="row justify-content-center">
        <div className="col-md-8">
          <CurrencyInput
            amount={amount}
            setAmount={setAmount}
            fromCurrency={fromCurrency}
            setFromCurrency={setFromCurrency}
            toCurrency={toCurrency}
            setToCurrency={setToCurrency}
          />
          <SwapButton onClick={handleSwap} />
          <button className="btn btn-primary w-100 mt-3" onClick={handleConvert}>
            계산하기
          </button>
          {error && <div className="text-danger mt-3">오류: {error}</div>}
          {result && (
            <ConversionResult
              amount={amount}
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              convertedAmount={result.convertedAmount}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Converter;
