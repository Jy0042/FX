// SwapButton.js
import React from 'react';
import { FaExchangeAlt } from 'react-icons/fa';

const SwapButton = ({ onClick }) => {
  return (
    <button
      className="btn btn-outline-secondary rounded-circle p-3"
      onClick={onClick}
      aria-label="통화 변경"
    >
      <FaExchangeAlt />
    </button>
  );
};

export default SwapButton;
