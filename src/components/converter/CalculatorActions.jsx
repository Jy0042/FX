import React from 'react';

const CalculatorActions = ({ addCalculator, saveCalculators }) => (
  <div className="text-end mt-4">
    <button className="btn btn-success me-2" onClick={addCalculator}>
      + 계산기 추가
    </button>
    <button className="btn btn-primary" onClick={saveCalculators}>
      저장하기
    </button>
  </div>
);

export default CalculatorActions;
