import React from 'react';
import Calculator from './Calculator';

const CalculatorList = ({ calculators, setCalculators, isAuthenticated }) => {
  const handleUpdate = (id, updatedCalculator) => {
    setCalculators((prev) =>
      prev.map((calc) => (calc.id === id ? { ...calc, ...updatedCalculator } : calc))
    );
  };

  const handleRemove = (id) => {
    setCalculators((prev) => prev.filter((calc) => calc.id !== id));
  };

  return (
    <div className="row justify-content-center">
      {calculators.map((calculator) => (
        <Calculator
          key={calculator?.id || Math.random()} // 방어적 코딩
          calculator={calculator}
          onUpdate={(updatedCalculator) => handleUpdate(calculator.id, updatedCalculator)}
          onRemove={isAuthenticated ? () => handleRemove(calculator.id) : null}
          isAuthenticated={isAuthenticated}
        />
      ))}
    </div>
  );
};

export default CalculatorList;
