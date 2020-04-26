import React, { useState, useRef } from 'react';

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
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDisplayedValue(value);
    if (inputRef.current) {
      inputRef.current.reportValidity();
    }

    const newValue = tryParseInt(value);
    if (!isNaN(newValue) && newValue > 0) {
      handleChangeValue(newValue);
    }
  };
  // TODO: better validation and error reporting
  // maxValue, minValue, max bingo # > size*size
  return (
    <div>
      <span>{text}</span>{' '}
      <input
        minLength={1}
        onChange={onChange}
        pattern="\d+"
        ref={inputRef}
        value={displayedValue}
        {...rest}
      />
    </div>
  );
};

export default NumberInput;
