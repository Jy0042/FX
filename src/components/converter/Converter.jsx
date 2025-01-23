import React, { useState, useEffect, useContext, useCallback } from 'react';
import AuthContext from '../../contexts/AuthContext';
import CalculatorList from './CalculatorList';
import CalculatorActions from './CalculatorActions';
import Tabs from './Tabs';
import { getSavedCalculators, saveCurrencyPair } from '../../utils/api';

const Converter = () => {
  const { isAuthenticated, userId, isLoading, login, logout } = useContext(AuthContext);
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

  // 로그인 시 계산기 목록 불러오기
  useEffect(() => {
    if (!isLoading) {
      fetchCalculators();
    }
  }, [fetchCalculators, isLoading]);

  const handleLogin = () => {
    login(userId, fetchCalculators); // 로그인 후 계산기 목록 동기화
  };

  const handleLogout = () => {
    logout(); // 로그아웃 처리 후 페이지 새로고침
  };

  const saveCalculators = async () => {
    try {
      if (!isAuthenticated || !userId) {
        console.warn('저장 요청 중 사용자가 인증되지 않았습니다.');
        return;
      }

      // 백엔드에서 기대하는 데이터 구조 생성
      const currencySet = calculators.map((calc, index) => [
        userId, // 사용자 ID
        calc.fromCurrency, // 출발 통화 코드
        calc.toCurrency, // 도착 통화 코드
        index + 1, // 정렬 순서
        calc.amount || null, // 금액 (없을 경우 null)
        null, // 알림 조건 (필요 시 설정)
      ]);

      console.log('저장 요청 데이터:', currencySet);

      // API 요청
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
