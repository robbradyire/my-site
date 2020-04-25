import React, { useState } from 'react';

const NUMBER_REGEX = /^\d+$/;
const tryParseInt = (str: string) =>
  NUMBER_REGEX.test(str) ? Number(str) : NaN;

interface NumberInputProps extends React.ComponentPropsWithoutRef<'input'> {
  defaultValue: number;
  handleChangeValue: (value: number) => void;
  text: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  defaultValue,
  handleChangeValue,
  text,
  ...rest
}) => {
  const [displayedValue, setDisplayedValue] = useState(defaultValue.toString());

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDisplayedValue(value);

    const newValue = tryParseInt(value);
    if (!isNaN(newValue) && newValue > 0) {
      handleChangeValue(newValue);
    }
  };
  return (
    <div>
      <span>{text}</span>{' '}
      <input onChange={onChange} value={displayedValue} {...rest} />
    </div>
  );
};

export default NumberInput;
