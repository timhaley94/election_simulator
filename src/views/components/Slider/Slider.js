import React from 'react';
import TooltipItem from './ToolTip';

const Slider = ({
  max,
  value,
  onChange: rawOnChange,
  ...props
}) => {
  const onChange = e => {
    rawOnChange(e.target.value);
  };

  return (
    <input
      { ...props }
      type="range"
      min={ 0 }
      max={ max }
      value={ value }
      onChange={ onChange }
    />
    <TooltipItem />
  );
};

export default Slider;
