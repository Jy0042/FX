import React from 'react';
import { FaExchangeAlt } from 'react-icons/fa';

const SwapButton = ({ onClick }) => {
  return (
    <button className="btn swap-button" onClick={onClick} aria-label="통화 변경">
      <FaExchangeAlt className="swap-icon" />
    </button>
  );
};

export default SwapButton;
