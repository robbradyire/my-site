import React from 'react';

const NUMBER_REGEX = /^\d+$/;
const tryParseInt = (str: string) =>
  NUMBER_REGEX.test(str) ? Number(str) : NaN;

interface NumberInputProps extends React.ComponentPropsWithoutRef<'input'> {
  currentValue: number;
  defaultValue: number;
  handleChangeValue: (value: number) => void;
  text: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  currentValue,
  defaultValue,
  handleChangeValue,
  text,
  ...rest
}) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newValue = tryParseInt(event.target.value);
    if (!isNaN(newValue)) {
      handleChangeValue(tryParseInt(value) || defaultValue);
    }
  };
  return (
    <div>
      <span>{text}</span>{' '}
      <input onChange={onChange} value={currentValue.toString()} {...rest} />
    </div>
  );
};

export default NumberInput;
