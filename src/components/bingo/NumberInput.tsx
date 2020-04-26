import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const NUMBER_REGEX = /^\d+$/;
const tryParseInt = (str: string) =>
  NUMBER_REGEX.test(str) ? Number(str) : NaN;

interface NumberInputProps extends React.ComponentPropsWithoutRef<'input'> {
  defaultValue: number;
  handleChangeValue: (value: number) => void;
  label: string;
}

const StyledInput = styled.input`
  ${({ maxLength }) => `max-width: ${maxLength}ch;`}
`;

const NumberInput: React.FC<NumberInputProps> = ({
  defaultValue,
  handleChangeValue,
  label,
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
      <label htmlFor={label}>
        {label}:{' '}
        <StyledInput
          id={label}
          minLength={1}
          onChange={onChange}
          ref={inputRef}
          value={displayedValue}
          {...rest}
        />
      </label>{' '}
    </div>
  );
};

export default NumberInput;
