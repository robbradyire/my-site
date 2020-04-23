import React from 'react';

const NUMBER_REGEX = /^\d+$/;
const tryParseInt = (str: string) =>
  NUMBER_REGEX.test(str) ? Number(str) : NaN;

interface NumberInputProps extends React.ComponentPropsWithoutRef<'input'> {
  defaultValue: number;
  handleChangeValue: (value: number) => void;
  currentValue: number;
}

const NumberInput: React.FC<NumberInputProps> = ({
  defaultValue,
  handleChangeValue,
  currentValue,
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
      <input onChange={onChange} value={currentValue.toString()} {...rest} />
    </div>
  );
};

export default NumberInput;
