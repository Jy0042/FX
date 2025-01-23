import React from 'react';

const InputComponent = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="form-label fw-bold">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className="form-control shadow-sm"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default InputComponent;
