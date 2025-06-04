import React from 'react';
type CellProps = {
  value: string;
  onChange: (val: string) => void;
  isConflict: boolean;
  disabled: boolean;
  extraClass?: string;
};

const Cell: React.FC<CellProps> = ({ value, onChange, isConflict, disabled, extraClass }) => {
  return (
    <input
      type="text"
      maxLength={1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`cell ${isConflict ? 'conflict' : ''} ${extraClass || ''}`}
      disabled={disabled}
    />
  );
};

export default Cell;