import React, { useState } from 'react';
import { getRate } from '../../utils/api';
import ConversionResult from './ConversionResult';
import CurrencyInput from './CurrencyInput';
import SwapButton from './SwapButton';
import ModalComponent from '../common/ModalComponent';

const Calculator = ({ calculator, onUpdate, onRemove, isAuthenticated }) => {
  const { amount, fromCurrency, toCurrency, result, error } = calculator;
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부 상태

  const handleConvert = async () => {
    try {
      const { convertedAmount } = await getRate(fromCurrency, toCurrency, amount);
      onUpdate({ result: convertedAmount, error: null });
    } catch (err) {
      console.error('환율 계산 중 오류:', err);
      onUpdate({ result: null, error: err.message });
    }
  };

  const handleDelete = () => {
    setShowModal(false); // 모달 닫기
    onRemove(); // 삭제 함수 실행
  };

  return (
    <div className="calculator-container mb-4">
      {/* 입력 및 선택 영역 */}
      <div className="row g-4 align-items-center d-flex justify-content-center">
        <div className="col-md-3">
          <label htmlFor="amount" className="form-label fw-bold">
            금액 입력
          </label>
          <input
            type="number"
            id="amount"
            className="form-control"
            value={amount}
            onChange={(e) => onUpdate({ amount: e.target.value })}
            placeholder="금액을 입력하세요"
          />
        </div>

        <div className="col-md-4 d-flex align-items-center">
          <div className="flex-grow-1">
            <label htmlFor="fromCurrency" className="form-label fw-bold">
              From 통화 선택
            </label>
            <CurrencyInput
              selectedCurrency={fromCurrency}
              setSelectedCurrency={(value) => onUpdate({ fromCurrency: value })}
            />
          </div>
        </div>

        {/* 스왑 버튼 */}
        <div className="col-md-1 d-flex align-items-center justify-content-center">
          <SwapButton
            onClick={() =>
              onUpdate({
                fromCurrency: toCurrency,
                toCurrency: fromCurrency,
              })
            }
          />
        </div>

        <div className="col-md-3 d-flex align-items-center">
          <div className="flex-grow-1">
            <label htmlFor="toCurrency" className="form-label fw-bold">
              To 통화 선택
            </label>
            <CurrencyInput
              selectedCurrency={toCurrency}
              setSelectedCurrency={(value) => onUpdate({ toCurrency: value })}
            />
          </div>
        </div>

        {isAuthenticated && (
          <div className="col-md-1 text-end">
            <button
              className="btn btn-danger mt-4"
              onClick={() => setShowModal(true)} // 모달 표시
            >
              삭제
            </button>
          </div>
        )}
      </div>

      {/* 계산 버튼 */}
      <div className="text-center mt-4">
        <button className="btn btn-primary px-4 py-2" onClick={handleConvert}>
          계산하기
        </button>
      </div>

      {/* 결과 출력 */}
      {error && <div className="text-danger mt-3">Error: {error}</div>}
      {result !== null && (
        <ConversionResult
          amount={amount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          convertedAmount={result}
        />
      )}

      {/* 삭제 확인 모달 */}
      <ModalComponent
        show={showModal}
        title="❗️ 계산기 삭제"
        body="정말 이 계산기를 삭제하시겠습니까? 삭제 후 복구할 수 없습니다."
        onClose={() => setShowModal(false)} // 취소 버튼 클릭 시 모달 닫기
        onConfirm={handleDelete} // 확인 버튼 클릭 시 삭제
      />
    </div>
  );
};

export default Calculator;
