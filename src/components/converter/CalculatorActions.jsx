import React, { useState } from 'react';
import ModalComponent from '../common/ModalComponent';

const CalculatorActions = ({ addCalculator, saveCalculators }) => {
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부 상태

  const handleSave = async () => {
    await saveCalculators(); // 저장 로직 실행
    setShowModal(true); // 저장 성공 시 모달 표시
  };

  return (
    <>
      <div className="text-end mt-4">
        <button className="btn btn-success me-2" onClick={addCalculator}>
          + 계산기 추가
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          저장하기
        </button>
      </div>

      {/* 저장 성공 모달 */}
      <ModalComponent
        show={showModal}
        title="💾 저장 성공!"
        body="모든 계산기가 성공적으로 저장되었습니다."
        onConfirm={() => setShowModal(false)} // 확인 버튼 클릭 시 모달 닫기
      />
    </>
  );
};

export default CalculatorActions;
