import React from 'react';
import { getRate } from '../../utils/api';
import ConversionResult from './ConversionResult';
import CurrencyInput from './CurrencyInput';
import SwapButton from './SwapButton';

const Calculator = ({ calculator, onUpdate, onRemove, isAuthenticated }) => {
  const { id, amount, fromCurrency, toCurrency, result, error } = calculator;

  const handleConvert = async () => {
    try {
      const { convertedAmount } = await getRate(fromCurrency, toCurrency, amount);
      onUpdate({ result: convertedAmount, error: null });
    } catch (err) {
      console.error('환율 계산 중 오류:', err);
      onUpdate({ result: null, error: err.message });
    }
  };

  return (
    <div className="col-md-8 mb-4">
      <div className="d-flex align-items-center">
        {/* 통화 입력 */}
        <CurrencyInput
          amount={amount}
          setAmount={(value) => onUpdate({ amount: value })}
          selectedCurrency={fromCurrency}
          setSelectedCurrency={(value) => onUpdate({ fromCurrency: value })}
        />
        {/* 통화 스왑 버튼 */}
        <SwapButton
          onClick={() => onUpdate({ fromCurrency: toCurrency, toCurrency: fromCurrency })}
        />
        <CurrencyInput
          amount={amount}
          setAmount={(value) => onUpdate({ amount: value })}
          selectedCurrency={toCurrency}
          setSelectedCurrency={(value) => onUpdate({ toCurrency: value })}
        />
        {isAuthenticated && (
          <button className="btn btn-danger ms-3" onClick={onRemove}>
            삭제
          </button>
        )}
      </div>

      {/* 계산 버튼 */}
      <div className="mt-3">
        <button className="btn btn-primary me-2" onClick={handleConvert}>
          계산하기
        </button>
      </div>

      {/* 결과 및 오류 메시지 */}
      {error && <div className="text-danger mt-2">오류: {error}</div>}
      {result !== null && (
        <ConversionResult
          amount={amount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          convertedAmount={result}
        />
      )}
    </div>
  );
};

export default Calculator;
