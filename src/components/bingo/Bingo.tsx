import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BingoTable from './BingoTable';
import NumberInput from './NumberInput';
import { isGreaterThan, isLessThan } from '../../utils/validation';
import { generateNumbers } from '../../utils/random';

const DEFAULT_SIZE = 5;
const DEFAULT_CEILING = 75;

const Button = styled.button`
  margin-top: 12px;
`;

const StyledNumberInput = styled(NumberInput)`
  margin-top: 12px;
`;

const Bingo: React.FC = () => {
  const [key, setKey] = useState(0);
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

  // TODO: if new size squared < ceiling, bump ceiling
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
    setSize(DEFAULT_SIZE);
    setCeiling(DEFAULT_CEILING);
    setKey(key + 1); // forces re-render to correct inputs
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
        key={key}
        label="Sheet size"
        maxLength={2}
        validators={[isLessThan(32)]}
      />
      <StyledNumberInput
        defaultValue={ceiling}
        handleChangeValue={setCeiling}
        key={key + 2}
        label="Max bingo number"
        maxLength={3}
        validators={[isGreaterThan(size * size - 1), isLessThan(1000)]}
      />
      <Button onClick={generateNewSheet}>New sheet</Button>
      <Button onClick={handleResetDefaults}>Reset defaults</Button>
    </React.Fragment>
  );
};

export default Bingo;
