import React from 'react';
import { FaExchangeAlt } from 'react-icons/fa';

const SwapButton = ({ onClick }) => {
  return (
    <button
      className="btn btn-outline-secondary rounded-circle p-3"
      onClick={onClick}
      aria-label="Swap currencies"
    >
      <FaExchangeAlt />
    </button>
  );
};

export default SwapButton;
