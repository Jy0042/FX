import React from 'react';
import PropTypes from 'prop-types';

const ButtonComponent = ({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  isLoading = false,
  disabled = false,
  onClick = () => {},
  ...props
}) => {
  const baseClass = `btn btn-${variant} ${className}`;

  return (
    <button
      type={type}
      className={baseClass}
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
    'outline-secondary',
    'outline-dark',
    'outline-primary',
  ]), // "outline" 추가
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ButtonComponent;
