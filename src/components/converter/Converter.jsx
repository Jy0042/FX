import React, { useState, useEffect, useContext, useCallback } from 'react';
import AuthContext from '../../contexts/AuthContext';
import CalculatorList from './CalculatorList';
import CalculatorActions from './CalculatorActions';
import Tabs from './Tabs';
import { getSavedCalculators, saveCurrencyPair } from '../../utils/api';

const Converter = () => {
  const { isAuthenticated, userId, isLoading } = useContext(AuthContext);
  console.log('Converter 컴포넌트 상태:', { isAuthenticated, userId, isLoading }); // 디버깅용 로그

  const [calculators, setCalculators] = useState([
    { id: 1, amount: 1, fromCurrency: 'USD', toCurrency: 'KRW', result: null, error: null },
  ]);

  const fetchCalculators = useCallback(async () => {
    if (!isAuthenticated || !userId) {
      console.log('사용자가 로그인되지 않았으므로 기본 계산기만 표시'); // 디버깅용 로그
      return;
    }

    try {
      const savedCalculators = await getSavedCalculators(userId);
      console.log('저장된 계산기 불러오기 성공:', savedCalculators); // 디버깅용 로그
      setCalculators(savedCalculators.length > 0 ? savedCalculators : calculators);
    } catch (error) {
      console.error('저장된 계산기 불러오기 실패:', error.message);
    }
  }, [isAuthenticated, userId]);

  useEffect(() => {
    if (!isLoading) {
      fetchCalculators();
    }
  }, [fetchCalculators, isLoading]);

  const saveCalculators = async () => {
    try {
      if (!isAuthenticated || !userId) {
        console.warn('저장 요청 중 사용자가 인증되지 않았습니다.');
        return;
      }

      const currencySet = calculators.map((calc) => [
        userId, // 사용자 ID
        calc.fromCurrency, // 소스 통화
        calc.toCurrency, // 대상 통화
        calc.amount || null, // 금액
        null, // sort_order, 필요시 교체
        null, // alert_condition, 필요시 교체
      ]);

      console.log('저장 요청 데이터:', currencySet);

      const result = await saveCurrencyPair(userId, currencySet);
      console.log('환율 쌍 저장 성공:', result);
    } catch (error) {
      console.error('계산기 저장 실패:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">환율 계산기</h1>
      <Tabs />
      <CalculatorList
        calculators={calculators}
        setCalculators={setCalculators}
        isAuthenticated={isAuthenticated}
      />
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
};

export default Converter;
