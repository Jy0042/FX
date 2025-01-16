import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  type = 'button', // 기본값 설정
  variant = 'primary', // 기본값 설정
  size = '', // 기본값 설정
  className = '', // 기본값 설정
  isLoading = false, // 기본값 설정
  disabled = false, // 기본값 설정
  onClick = () => {}, // 기본값 설정
  ...props
}) => {
  const baseClass = `btn btn-${variant} ${size ? `btn-${size}` : ''}`;

  return (
    <button
      type={type}
      className={`${baseClass} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
      )}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
    'link',
    'outline',
  ]),
  size: PropTypes.oneOf(['sm', 'lg', '']),
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
