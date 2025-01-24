import React, { useState, useEffect, useContext, useCallback } from 'react';
import AuthContext from '../../contexts/AuthContext';
import CalculatorActions from './CalculatorActions';
import Tabs from './Tabs';
import { getSavedCalculators, saveCurrencyPair } from '../../utils/api';
import Calculator from './Calculator';

const Converter = () => {
  const { isAuthenticated, userId, isLoading } = useContext(AuthContext);
  const [calculators, setCalculators] = useState([
    { id: 1, amount: 1, fromCurrency: 'USD', toCurrency: 'KRW', result: null, error: null },
  ]);
  const [activeTab, setActiveTab] = useState('calculator'); // 현재 활성화된 탭

  const fetchCalculators = useCallback(async () => {
    if (!isAuthenticated || !userId) return;

    try {
      const savedCalculators = await getSavedCalculators(userId);
      setCalculators(savedCalculators.length > 0 ? savedCalculators : calculators);
    } catch (error) {
      console.error('저장된 계산기 불러오기 실패:', error.message);
    }
  }, [isAuthenticated, userId]);

  useEffect(() => {
    if (!isLoading) fetchCalculators();
  }, [fetchCalculators, isLoading]);

  const saveCalculators = async () => {
    if (!isAuthenticated || !userId) return;

    const currencySet = calculators.map((calc, index) => [
      userId,
      calc.fromCurrency,
      calc.toCurrency,
      index + 1,
      calc.amount || null,
      null,
    ]);

    try {
      await saveCurrencyPair(userId, currencySet);
    } catch (error) {
      console.error('계산기 저장 실패:', error.message);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'calculator':
        return (
          <div className="bg-white p-4 rounded shadow-sm">
            {calculators.map((calculator, index) => (
              <div key={calculator.id} className="card mb-4 shadow-sm">
                <div className="p-4 w-100">
                  {' '}
                  {/* 여기서 너비를 꽉 채우도록 수정 */}
                  <Calculator
                    calculator={calculator}
                    onUpdate={(updatedCalculator) => {
                      const updated = [...calculators];
                      updated[index] = { ...calculator, ...updatedCalculator };
                      setCalculators(updated);
                    }}
                    onRemove={() => setCalculators(calculators.filter((_, i) => i !== index))}
                    isAuthenticated={isAuthenticated}
                  />
                </div>
              </div>
            ))}
            {!isLoading && isAuthenticated && (
              <CalculatorActions
                addCalculator={() =>
                  setCalculators([
                    ...calculators,
                    {
                      id: Date.now(),
                      amount: 1,
                      fromCurrency: 'USD',
                      toCurrency: 'KRW',
                      result: null,
                      error: null,
                    },
                  ])
                }
                saveCalculators={saveCalculators}
              />
            )}
          </div>
        );
      case 'chart':
        return <div className="bg-white p-4 rounded shadow-sm">차트 기능 준비 중...</div>;
      case 'alert':
        return <div className="bg-white p-4 rounded shadow-sm">알림 기능 준비 중...</div>;
      case 'history':
        return <div className="bg-white p-4 rounded shadow-sm">변환 기록 준비 중...</div>;
      default:
        return null;
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold mb-4">환율 계산기</h1>
        <h3 className="text-muted fs-5">쉽고 빠르게 환율을 계산하세요</h3>
      </div>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {renderContent()}
    </div>
  );
};

export default Converter;
