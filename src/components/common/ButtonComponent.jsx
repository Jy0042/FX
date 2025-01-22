import React from 'react';
import PropTypes from 'prop-types';

const ButtonComponent = ({
  children,
  type = 'button',
  variant = 'primary',
  size = '',
  className = '',
  isLoading = false,
  disabled = false,
  onClick = () => {},
  ...props
}) => {
  const baseClass = `btn btn-${variant} ${size ? `btn-${size}` : ''}`;

  return (
    <button
      type={type}
      className={`${baseClass} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props} // 추가 속성 적용
    >
      {isLoading && (
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
      )}
      {children}
    </button>
  );
};

ButtonComponent.propTypes = {
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

export default ButtonComponent;
