import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BingoTable from './BingoTable';
import NumberInput from './NumberInput';

const DEFAULT_SIZE = 5;
const DEFAULT_CEILING = 75;

const generateNumbers = (size: number, ceiling: number) =>
  Array(size * size)
    .fill(0)
    .map(() => Math.floor(Math.random() * ceiling + 1));

const Button = styled.button`
  margin-top: 12px;
`;

const StyledNumberInput = styled(NumberInput)`
  margin-top: 12px;
`;

const Bingo: React.FC = () => {
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [ceiling, setCeiling] = useState(DEFAULT_CEILING);
  const [numbers, setNumbers] = useState(generateNumbers(size, ceiling));
  const [checkedNumbers, setCheckedNumbers] = useState<Record<number, boolean>>(
    {}
  );

  const generateNewSheet = () => {
    setNumbers(generateNumbers(size, ceiling));
    setCheckedNumbers({});
  };

  useEffect(generateNewSheet, [size, ceiling]);

  const getIndex = (row: number, column: number) => row * size + column;
  const isChecked = (row: number, column: number) =>
    checkedNumbers[getIndex(row, column)];

  const handleClickCell = (row: number, column: number) => {
    const index = getIndex(row, column);
    setCheckedNumbers({
      ...checkedNumbers,
      [index]: !checkedNumbers[index],
    });
  };

  const handleResetDefaults = () => {
    // TODO: also reset input values
    setSize(DEFAULT_SIZE);
    setCeiling(DEFAULT_CEILING);
  };

  return (
    <React.Fragment>
      <BingoTable
        handleClickCell={handleClickCell}
        isChecked={isChecked}
        numbers={numbers}
      />
      <StyledNumberInput
        defaultValue={size}
        handleChangeValue={setSize}
        label="Sheet size"
        maxLength={2}
      />
      <StyledNumberInput
        defaultValue={ceiling}
        handleChangeValue={setCeiling}
        label="Max bingo number"
        maxLength={3}
      />
      <Button onClick={generateNewSheet}>New sheet</Button>
      <Button onClick={handleResetDefaults}>Reset defaults</Button>
    </React.Fragment>
  );
};

export default Bingo;
