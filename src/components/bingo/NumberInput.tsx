import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { tryParseInt } from '../../utils/parsing';
import { nonZero, InputValidator, isNumber } from '../../utils/validation';

const DEFAULT_VALIDATORS = [isNumber, nonZero];

interface NumberInputProps extends React.ComponentPropsWithoutRef<'input'> {
  defaultValue: number;
  handleChangeValue: (value: number) => void;
  label: string;
  validators?: InputValidator<number>[];
}

const StyledInput = styled.input`
  ${({ maxLength }) => `max-width: ${maxLength}ch;`}
`;

const NumberInput: React.FC<NumberInputProps> = ({
  defaultValue,
  handleChangeValue,
  label,
  validators,
  ...rest
}) => {
  const [displayedValue, setDisplayedValue] = useState(defaultValue.toString());
  const [errors, setErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputValidators = [...DEFAULT_VALIDATORS, ...(validators || [])];

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDisplayedValue(value);
    if (inputRef.current) {
      inputRef.current.reportValidity();
    }

    const newValue = tryParseInt(value);
    const inputErrors: string[] = inputValidators.reduce(
      (acc: string[], { getErrorMessage, validator }) =>
        validator(newValue) ? acc : [...acc, getErrorMessage(label)],
      []
    );
    setErrors(inputErrors);
    if (inputErrors.length === 0) {
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
      </label>
      {errors.map((error) => (
        <div key={error}>{error}</div>
      ))}
    </div>
  );
};

export default NumberInput;
