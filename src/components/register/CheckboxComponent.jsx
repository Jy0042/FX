import React from 'react';

const CheckboxComponent = ({
  id,
  name,
  label,
  checked,
  onChange,
  onViewDetails,
  viewButtonText,
}) => {
  return (
    <div className="form-check mb-4">
      <input
        type="checkbox"
        id={id}
        name={name}
        className="form-check-input"
        checked={checked}
        onChange={onChange}
        required
      />
      <label
        htmlFor={id}
        className="form-check-label d-flex justify-content-between align-items-center"
      >
        {label}
        {onViewDetails && (
          <span
            className="text-primary text-decoration-underline"
            style={{ cursor: 'pointer' }}
            onClick={onViewDetails}
          >
            [{viewButtonText}]
          </span>
        )}
      </label>
    </div>
  );
};

export default CheckboxComponent;
